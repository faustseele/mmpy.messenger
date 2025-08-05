import EventBus from "../../services/events/EventBus.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { isChildrenList } from "../../utils/componentFactory.ts";
import type {
  ComponentProps,
  IChildrenData,
  IChildrenMap,
  IComponentAttributes,
  IComponentConfigs,
  IComponentData,
  IComponentEvents,
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

export default abstract class Component<
  /**
   * Extensions are needed for polymorphic use
   * E.g. IAuthConfigs
   * */
  C extends IComponentConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
  CD extends IChildrenData,
> {
  protected domService: DOMService<C, E>;
  protected fragmentService: FragmentService<C>;

  private _configs: C;
  private _attributes?: A;
  private _events?: E;
  private _childrenData?: CD;
  private _childrenMap?: IChildrenMap;
  private eventBus: EventBus = new EventBus();
  private _hasChildren(
    childrenMap = this._childrenMap,
  ): childrenMap is IChildrenMap {
    return !!childrenMap && Object.keys(childrenMap).length > 0;
  }
  public readonly id: string;
  public get configs(): C {
    return this._configs;
  }
  public get element(): HTMLElement | null {
    return this.domService.element;
  }
  public get childrenData(): CD | undefined {
    return this._childrenData;
  }

  /**
   * Returns the component's HTML structure as a string.
   * Is redefined in Component instantiations to get a layout.
   */
  public abstract getSourceMarkup(): string;

  constructor({
    deps: { domService, fragmentService },
    data: { configs, events, attributes, childrenData, childrenMap },
  }: ComponentProps<C, A, E, CD>) {
    this.domService = domService;
    this.fragmentService = fragmentService;

    this._configs = proxifyConfigs(configs, this.eventBus);
    this._attributes = proxifyAttributes(attributes ?? {}, this.eventBus) as A;
    this._events = events;
    this._childrenData = childrenData;
    this._childrenMap = childrenMap;

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

  /* Informational. Propagates to childrenMap */
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
    Object.values(this._childrenMap!).forEach((childrenMapChunk) => {
      if (isChildrenList(childrenMapChunk)) {
        const childrenList = childrenMapChunk;
        childrenList.list.forEach((child) =>
          child.eventBus.emit("flow:component-did-mount"),
        );
      } else {
        const child = childrenMapChunk;
        child.eventBus.emit("flow:component-did-mount");
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
          this._childrenMap!,
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
   * Propagates to childrenMap.
   * Called before the Component is removed from the DOM (unmounted).
   */
  public componentDidUnmount(): void {
    this.eventBus.emit("flow:component-did-unmount");

    if (!this._hasChildren()) return;

    /* Recusively mounting children on one nested level */
    Object.values(this._childrenMap!).forEach((childrenMapChunk) => {
      if (isChildrenList(childrenMapChunk)) {
        const childrenList = childrenMapChunk;
        childrenList.list.forEach((child) =>
          child.eventBus.emit("flow:component-did-unmount"),
        );
      } else {
        const child = childrenMapChunk;
        child.eventBus.emit("flow:component-did-unmount");
      }
    });
  }

  /** Invokes Proxy-setters.
   * New configs -> invoke Proxy-setters
   * New events -> invoke swap listeners
   * @Partial is used in case IComponentConfigs in the props are not defined.
   * TODO: implement proxifed event */
  public setProps(nextProps: Partial<IComponentData<C, A, E, CD, this>>): void {
    if (!nextProps) return;

    const hasConfigs = !!nextProps.configs;
    const hasAttributes = !!nextProps.attributes;
    const hasEvents = !!nextProps.events;
    const hasChildrenMap = !!nextProps.childrenMap;

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
      Object.assign(this._childrenMap ?? {}, nextProps.childrenData);
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
