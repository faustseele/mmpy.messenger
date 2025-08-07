import EventBus from "../../services/events/EventBus.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import type {
  BaseProps,
  IChildren,
  IComponentData,
  IComponentDeps,
} from "./Component.d";
import { proxifyAttributes, proxifyConfigs } from "./utils.ts";

/** Abstract class for the Component
 * Following the Separation of Concerns principle,
 * Two Dependencies are injected into the Component:
 * @DOMService & @FragmentService
 *
 * '_initComponent' method call-sequence:
 * _initComponent -> CDM + CDR
 *
 * Lifecycle flow:methods call-sequence:
 * public -> EventBus -> private
 * */

export interface ComponentParams {
  deps: IComponentDeps;
  data: IComponentData;
}

export default abstract class Component<TProps extends BaseProps> {
  protected domService: DOMService<TProps["configs"], TProps["events"]>;
  protected fragmentService: FragmentService<TProps["configs"]>;

  private _configs: TProps["configs"];
  private _attributes?: TProps["attributes"];
  private _events?: TProps["events"];
  private _childrenData?: TProps["childrenData"];
  private _children?: IChildren;
  private eventBus: EventBus = new EventBus();
  private _hasChildren(children = this._children): children is IChildren {
    return !!children && Object.keys(children).length > 0;
  }
  public readonly id: string;
  public get configs(): TProps["configs"] {
    return this._configs;
  }
  public get element(): HTMLElement | null {
    return this.domService.element;
  }
  public get childrenData(): TProps["childrenData"] {
    return this._childrenData;
  }
  public get children(): IChildren | undefined {
    return this._children;
  }

  /**
   * Returns the component's HTML structure as a string.
   * Is redefined in Component instantiations to get a layout.
   */
  public abstract getSourceMarkup(): string;

  constructor({
    deps: { domService, fragmentService },
    data: { configs, events, attributes, childrenData, children },
  }: ComponentParams) {
    this.domService = domService;
    this.fragmentService = fragmentService;

    this._configs = proxifyConfigs(configs, this.eventBus);
    this._attributes = proxifyAttributes(
      attributes ?? {},
      this.eventBus,
    ) as TProps["attributes"];
    this._events = events;
    this._childrenData = childrenData;
    this._children = children;

    this.id = this.domService.id;
    this._registerEventBusEvents();
    this._initComponent();
  }

  /* Private methods are only called through EventBus */
  private _registerEventBusEvents(): void {
    this.eventBus.on(
      "flow:component-did-mount",
      this._componentDidMount.bind(this),
    );
    this.eventBus.on("flow:render", this._componentDidRender.bind(this));
    this.eventBus.on(
      "flow:component-did-update",
      this._componentDidUpdate.bind(this),
    );
    this.eventBus.on(
      "flow:component-did-unmount",
      this._componentDidUnmount.bind(this),
    );
  }

  /* A go-to -> CDU + CDR */
  private _initComponent(): void {
    /* Creating the Element, do CDR */
    this.eventBus.emit("flow:render");

    /* The Element exists, so we can call the CDM */
    this.eventBus.emit("flow:component-did-mount");
  }

  /* Informational. Propagates to children */
  private _componentDidMount(): void {
    this.componentDidMount();
  }

  /**
   * This one is called by DOMService
   * after the Parent-Component is added to the DOM (mounted).
   */
  public componentDidMount(): void {
    if (!this._hasChildren()) return;

    /* Recusively mounting children on one nested level */
    Object.values(this._children!).forEach((childrenChunk) => {
      if (childrenChunk.type === "list") {
        childrenChunk.children.forEach((child) =>
          child.eventBus.emit("flow:component-did-mount"),
        );
      } else if (childrenChunk.type === "single") {
        childrenChunk.child.eventBus.emit("flow:component-did-mount");
      } else {
        throw new Error("Wrong children type", childrenChunk);
      }
    });
  }

  /* On _initComponent & CDM; On CDU */
  private _componentDidRender(): void {
    /* Create the Component Element */
    this.domService.createElement();

    /* Checking if Element is created successfully */
    if (!this.domService.element) return;

    const markup = this.getSourceMarkup();
    const deproxifiedConfigs = { ...this._configs };

    /* Get a compiled (innerHTML) DocumentFragment from FragmentService */
    const innerFragment = this._hasChildren()
      ? this.fragmentService.compileWithChildren(
          markup,
          deproxifiedConfigs,
          this._children!,
        )
      : this.fragmentService.compile(markup, deproxifiedConfigs);

    this.domService.removeListeners(this._events);

    /* DOMService renders: handles innerHTML and appendChild */
    this.domService.insertFragmentIntoElement(innerFragment);

    this.domService.addListeners(this._events);
  }

  /* Is redefined in concrete Components */
  public componentDidRender(): void {}

  /* A go-to -> CDR */
  private _componentDidUpdate(): void {
    this.eventBus.emit("flow:render");
  }

  /* Removes listeners */
  private _componentDidUnmount(): void {
    this.domService.removeListeners(this._events);
  }

  /**
   * This one is called by Router on new Component-Page.
   * Propagates to children.
   * Called before the Component is removed from the DOM (unmounted).
   */
  public componentDidUnmount(): void {
    this.eventBus.emit("flow:component-did-unmount");

    if (!this._hasChildren()) return;

    /* Recusively mounting children on one nested level */

    Object.values(this._children!).forEach((childrenChunk) => {
      if (childrenChunk.type === "list") {
        childrenChunk.children.forEach((child) =>
          child.eventBus.emit("flow:component-did-unmount"),
        );
      } else if (childrenChunk.type === "single") {
        childrenChunk.child.eventBus.emit("flow:component-did-unmount");
      } else {
        throw new Error("Wrong children type", childrenChunk);
      }
    });
  }

  /** Invokes Proxy-setters.
   * New configs -> invoke Proxy-setters
   * New events -> invoke swap listeners
   * @Partial is used in case IComponentConfigs in the props are not defined.
   * TODO: implement proxifed event */
  public setProps(nextProps: Partial<IComponentData>): void {
    if (!nextProps) return;

    const hasConfigs = !!nextProps.configs;
    const hasAttributes = !!nextProps.attributes;
    const hasEvents = !!nextProps.events;
    const hasChildrenMap = !!nextProps.children;

    if (hasConfigs) {
      Object.assign(this._configs, nextProps.configs);
    }

    if (hasAttributes) {
      Object.assign(this._attributes ?? {}, nextProps.attributes);
    }

    if (hasEvents) {
      const newEvents = Object.assign(this._events ?? {}, nextProps.events);

      /* Hot-swap the listeners on the current DOM element */
      if (this.domService.element) {
        this.domService.removeListeners(this._events);
        this.domService.addListeners(newEvents);
      }

      this._events = newEvents;
    }

    if (hasChildrenMap) {
      Object.assign(this._children ?? {}, nextProps.children);
    }
  }

  /**
   * DOMService helper.
   * Makes the Component visible
   */
  public show(): void {
    const element = this.domService.element;
    if (!element) return;

    element!.style.display = "flex";
  }

  /** DOMService helper
   * Makes the Component invisible */
  public hide(): void {
    const element = this.domService.element;
    if (!element) return;

    element!.style.display = "none";
  }
}
