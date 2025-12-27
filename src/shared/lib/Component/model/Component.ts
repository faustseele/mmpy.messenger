import DOMService from "../../DOM/DOMService.ts";
import EventBus from "../../EventBus/EventBus.ts";
import FragmentService from "../../Fragment/FragmentService.ts";
import { proxifyParams } from "../../helpers/proxy/functions.ts";
import { lgg } from "../../logs/Logger.ts";
import { BaseProps } from "./base.types.ts";
import { ChildGraph, ChildrenFlat } from "./children.types.ts";
import { ComponentEventBusEvents } from "./event.types.ts";
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
  private _attrs?: P["attributes"];
  private _on?: P["on"];
  private _children?: ChildGraph;

  /* --- Helpers --- */
  private _bus: EventBus<ComponentEventBusEvents> = new EventBus();

  /* --- Getters --- */
  public get configs(): P["configs"] {
    return this._configs;
  }
  public get attributes(): P["attributes"] {
    return this._attrs;
  }
  public get on(): P["on"] {
    return this._on;
  }
  public get element(): HTMLElement | null {
    return this.domService.element;
  }
  public get bus(): EventBus<ComponentEventBusEvents> {
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

  /* get overridden */
  public componentDidRender(): void {}
  public componentDidMount(): void {}
  public componentDidUpdate(): void {}
  public componentDidUnmount(): void {}
  public getSourceMarkup(): string {
    /* spits html-structure as a string */
    return ``;
  }

  constructor({
    deps: { domService, fragmentService },
    node: { params },
  }: ComponentProps<P, Component<P>>) {
    /* --- Node --- */
    const { configs, attributes, on, children } = proxifyParams(
      params,
      this._bus,
    );
    this.id = configs.id;
    this._configs = configs;
    this._attrs = attributes ?? {};
    this._on = (on as P["on"]) ?? {};
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

  /* on _initComponent & CDM; On CDU */
  private _componentDidRender(): void {
    /* creates the Element */
    this.domService.createElement();

    /* checks if Element alive */
    if (!this.domService.element) return;

    const markup = this.getSourceMarkup();
    const deproxifiedConfigs = { ...this._configs };

    /* get a compiled (innerHTML) DocumentFragment from FragmentService */
    const innerFragment = this.children?.nodes
      ? this.fragmentService.compileWithChildren(
          markup,
          deproxifiedConfigs,
          this.children,
        )
      : this.fragmentService.compile(markup, deproxifiedConfigs);

    this.domService.removeListeners(this._on);

    /* DOMService renders: handles innerHTML and appendChild */
    this.domService.insertFragmentIntoElement(innerFragment);

    this.domService.addListeners(this._on);

    /* allows components to run post-render logic */
    this.componentDidRender();
  }

  /* informational; propagates to childrenFlat */
  private _componentDidMount(): void {
    if (!this.childrenFlat) return;

    /* recusively mounting children */
    Object.values(this.childrenFlat).forEach((child) => {
      if (!child.runtime?.instance) {
        lgg.error("Child has no instance", child, this);
        return;
      }
      child.runtime.instance.bus.emit("flow:component-did-mount");
    });

    /* allows components to run post-mount logic */
    this.componentDidMount();
  }

  /* emits -> CDR */
  private _componentDidUpdate(): void {
    this._bus.emit("flow:render");

    /* allows components to run post-update logic */
    this.componentDidUpdate();
  }

  /**
   * emits on Router -> new Page
   * propagates to children
   * called before the CDUnmounted
   * removes listeners
   */
  private _componentDidUnmount(): void {
    this.domService.removeListeners(this._on);

    if (!this.childrenFlat) return;

    /* using bus to fully unmount children */
    Object.values(this.childrenFlat).forEach((value) => {
      if (!value.runtime?.instance) {
        lgg.error("Child has no instance", value, this);
      }
      value.runtime?.instance._bus.emit("flow:component-did-unmount");
    });

    /* allows components to run post-unmount logic */
    this.componentDidUnmount();
  }

  /* invokes Proxy-setters */
  public setProps(patch: ComponentPatch<P>): void {
    if (!patch) return;
    Object.assign(this._configs, patch.configs);
    const { configs, attributes, on, children } = patch;
    if (configs) Object.assign(this._configs, configs);
    if (attributes) Object.assign(this._attrs!, attributes);
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
