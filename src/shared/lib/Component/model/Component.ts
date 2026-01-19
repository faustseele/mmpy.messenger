import { isEqual } from "@/app/providers/store/lib/utils.ts";
import DOMService from "../../DOM/DOMService.ts";
import EventBus from "../../EventBus/EventBus.ts";
import FragmentService from "../../Fragment/FragmentService.ts";
import { proxifyParams } from "../../helpers/proxy/functions.ts";
import { BaseProps } from "./base.types.ts";
import { ChildGraph, ChildrenFlat } from "./children.types.ts";
import { ComponentEvents } from "./event.types.ts";
import { ComponentId, ComponentPatch, ComponentProps } from "./types.ts";

/**
 * abstract class for the Component
 * following the Separation of Concerns principle,
 * 2 deps are injected into Component:
 * @DOMService & @FragmentService
 *
 * '_initComponent' method call-sequence:
 * _initComponent -> CDR -> CDM
 *
 * lifecycle flow:methods sequence:
 * EventBus → private hook → public hook
 */

export default abstract class Component<P extends BaseProps> {
  /* --- Dependencies --- */
  protected domService: DOMService<P>;
  protected fragmentService: FragmentService<P["configs"]>;

  /* --- Node --- */
  public readonly id: ComponentId;
  private _configs: P["configs"];
  private _cx: string = "";
  private _on?: P["on"];
  private _attachedListeners: P["on"] = {};
  private _children?: ChildGraph;

  /* --- Helpers --- */
  private _bus: EventBus<ComponentEvents> = new EventBus();

  /* --- Getters --- */
  public get configs(): P["configs"] {
    return this._configs;
  }
  public get on(): P["on"] {
    return this._on;
  }
  public get element(): HTMLElement | null {
    return this.domService.element;
  }
  public get bus(): EventBus<ComponentEvents> {
    return this._bus;
  }
  public get children(): ChildGraph | undefined {
    return this._children;
  }
  public get childrenFlat(): ChildrenFlat | undefined {
    return this._children?.nodes
      ? Object.values(this._children.nodes)
      : undefined;
  }

  /* --- Concrete Methods --- */
  public componentDidRender(): void {}
  public componentDidMount(): void {}
  public componentDidUpdate(): void {}
  public componentDidUnmount(): void {}

  /**
   * @param configs to conditionally format classNames
   * @returns classNames string
   */
  public getRootTagCx(configs: P["configs"]): string {
    return configs.classNames;
  }

  /**
   * @returns inner-html from inside the root tag (excludes Component's root-tag)
   */
  public getInnerMarkup(): string {
    return ``;
  }

  constructor({
    deps: { domService, fragmentService },
    node: { params },
  }: ComponentProps<P, Component<P>>) {
    /* --- Node --- */
    const { configs, on, children } = proxifyParams(params, this._bus);
    this.id = configs.id;
    this._configs = configs;
    this._on = on ?? {};
    this._children = children ?? {
      edges: {},
      nodes: {},
    };

    /* --- Dependencies --- */
    this.domService = domService;
    this.fragmentService = fragmentService;

    /* --- Initialization --- */
    this._registerEventBusEvents();
    this._initComponent();
  }

  /* private methods are called through EventBus */
  private _registerEventBusEvents(): void {
    this._bus.on("flow:render", this._componentDidRender.bind(this));
    this._bus.on(
      "flow:component-did-mount",
      this._componentDidMount.bind(this),
    );
    this._bus.on(
      "flow:component-did-update",
      this._componentDidUpdate.bind(this),
    );
    this._bus.on(
      "flow:component-did-unmount",
      this._componentDidUnmount.bind(this),
    );
  }

  /* emits -> CDU + CDR */
  private _initComponent(): void {
    /* creates the Element + CDR */
    this._bus.emit("flow:render");

    /* element exists -> call CDM */
    this._bus.emit("flow:component-did-mount");
  }

  /* on _initComponent; On CDU */
  private _componentDidRender(): void {
    if (!this.domService.element) this._createElement();

    /* (re-)drawing logic of the element */
    const innerFragment = (() => {
      const markup = this.getInnerMarkup();
      const deproxifiedConfigs = { ...this._configs };
      const hasChildren = this.children?.nodes;

      /* get a compiled (innerHTML) DocumentFragment from FragmentService */
      if (hasChildren) {
        return this.fragmentService.compileWithChildren(
          markup,
          deproxifiedConfigs,
          this.children,
        );
      } else {
        return this.fragmentService.compile(markup, deproxifiedConfigs);
      }
    })();

    /* DOMService renders: handles innerHTML and appendChild */
    this.domService.insertFragmentIntoElement(innerFragment);

    /* allows components to run post-render logic */
    this.componentDidRender();
  }

  /* informational; propagates to childrenFlat */
  private _componentDidMount(): void {
    if (!this.childrenFlat) return;

    /* recusively mounting children */
    Object.values(this.childrenFlat).forEach((child) => {
      if (!child.runtime?.instance) {
        console.error("Child has no instance", child, this);
        return;
      }
      child.runtime.instance.bus.emit("flow:component-did-mount");
    });

    /* allows components to run post-mount logic */
    this.componentDidMount();
  }

  /* emits -> CDR */
  private _componentDidUpdate(): void {
    /* updates listners if !eq */
    if (!isEqual(this._on ?? {}, this._attachedListeners ?? {})) {
      this.domService.removeListeners(this._attachedListeners);
      this.domService.addListeners(this._on);
      this._attachedListeners = { ...this._on };
    }

    /* updates classNames if !eq */
    const newCx = this.getRootTagCx(this._configs);
    if (this._cx !== newCx) this.domService.setRootTagCx(newCx);

    /* concrete component logic */
    this.componentDidUpdate();

    /* CDR emits after listeners & classNames updated */
    this._bus.emit("flow:render");
  }

  /**
   * emits on Router -> new Page
   * propagates to children
   * called before the CDUnmounted
   * removes listeners
   */
  private _componentDidUnmount(): void {
    this.domService.removeListeners(this._attachedListeners);

    if (!this.childrenFlat) return;

    /* using bus to fully unmount children */
    Object.values(this.childrenFlat).forEach((value) => {
      if (!value.runtime?.instance) {
        console.error("Child has no instance", value, this);
      }
      value.runtime?.instance._bus.emit("flow:component-did-unmount");
    });

    /* allows components to run post-unmount logic */
    this.componentDidUnmount();
  }

  private _createElement(): void {
    /* creates the Element */
    this.domService.createElement();

    /* sets classNames */
    this._cx = this.getRootTagCx(this._configs);
    this.domService.setRootTagCx(this._cx);

    /* sets initial listeners */
    this.domService.addListeners(this._on);
    this._attachedListeners = { ...this._on };
  }

  /* invokes Proxy-setters */
  public setProps(patch: ComponentPatch<P>): void {
    if (!patch) return;

    Object.assign(this._configs, patch.configs);

    const { configs, on, children } = patch;
    if (configs) Object.assign(this._configs, configs);
    if (on) Object.assign(this._on!, on);
    if (children) Object.assign(this._children as object, children);
  }

  /* DOMService -> makes visible */
  public show(): void {
    const element = this.domService.element;
    if (!element) return;

    element!.style.display = "flex";
  }

  /* DOMService -> makes invisible */
  public hide(): void {
    const element = this.domService.element;
    if (!element) return;

    element!.style.display = "none";
  }
}
