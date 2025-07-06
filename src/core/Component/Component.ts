import EventBus from "../../services/events/EventBus.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import type {
  ComponentChildren,
  ComponentConfigs,
  ComponentEvents,
  ComponentProps,
} from "./Component.d";

/** Abstract class for the Component
 * Following the Separation of Concerns principle,
 * Two Dependencies are injected into the Component:
 * @DOMService & @FragmentService */

export default abstract class Component {
  protected domService: DOMService;
  protected templateService: FragmentService;

  private eventBus: EventBus = new EventBus();

  public readonly id: string;
  public configs: ComponentConfigs;
  public children: ComponentChildren = {};
  public events: ComponentEvents;

  /* Is redefined in Component instantiations
    to get a layout */
  public abstract getSourceMarkup(): string;

  constructor(
    props: ComponentProps,
    children: ComponentChildren,

    /* Dependencies modules */
    domService: DOMService,
    templateService: FragmentService,
  ) {
    const { configs, events = {} } = props;
    this.events = events;
    this.children = children;
    this.configs = this._proxifyConfigs(configs);

    this.domService = domService;
    this.templateService = templateService;

    this.id = this.domService.id;

    this._registerEventBusEvents();

    this.eventBus.emit("init");
  }

  private _registerEventBusEvents(): void {
    this.eventBus.on("init", this._init.bind(this));
    this.eventBus.on(
      "flow:component-did-mount",
      this._componentDidMount.bind(this),
    );
    this.eventBus.on("flow:render", this._render.bind(this));
    this.eventBus.on(
      "flow:component-did-update",
      this._componentDidUpdate.bind(this),
    );
  }

  private _init(): void {
    this.domService.createElement();

    this.eventBus.emit("flow:component-did-mount");
    this.eventBus.emit("flow:render");
  }

  /* For now it's useless. Propagates event to children */
  private _componentDidMount(): void {
    this.dispatchChildrenComponentDidMount();
  }

  /* Re-render the component */
  private _componentDidUpdate(): void {
    this.eventBus.emit("flow:render");
  }

  /**
   * Implementing Reactivity through Proxy
   * @param configs
   */
  private _proxifyConfigs<T extends ComponentConfigs>(configs: T): T {
    if (typeof configs !== "object" || !configs) {
      throw new Error(`Props must be an object, got ${typeof configs}`);
    }

    const proxiedProps = new Proxy(configs, {
      /**
       * Arrows are here to access EventBus
       * @prop: PropertyKey is string | number | symbol
       */
      set: (target: T, prop: PropertyKey, value: unknown) => {
        /* Type Assertion for writing to configs (Generic T is read-only) */
        (target as { [key: PropertyKey]: unknown })[prop] = value;

        this.eventBus.emit("flow:component-did-update");
        return true;
      },
      deleteProperty: (target: T, prop: PropertyKey) => {
        if (typeof prop === "string" && prop.startsWith("_")) return false;

        delete (target as Record<PropertyKey, unknown>)[prop];
        this.eventBus.emit("flow:component-did-update");

        return true;
      },
    });

    return proxiedProps;
  }

  private _render(): void {
    /* Get the HTMLElement from DOMService */
    const element = this.domService.getElement();
    if (!element) return;

    /* Get a compiled (innerHTML) DocumentFragment from FragmentService */
    const innerFragment = this.templateService.compile(
      this.getSourceMarkup(),
      { ...this.configs } /* De-Proxy configs */,
      this.children,
    );

    this.domService.removeListeners(this.events);

    /* DOMService renders: handles innerHTML and appendChild */
    this.domService.insertFragmentIntoElement(innerFragment); //

    this.domService.addListeners(this.events);
  }

  /* This one is called by DOMService
    after the Parent-Component is mounted */
  public dispatchChildrenComponentDidMount(): void {
    /* Yeah, we be mounted */

    /* Recusively mounting children */
    Object.values(this.children).forEach((childrenArr) =>
      childrenArr.forEach((childrenArr) => childrenArr.dispatchChildrenComponentDidMount()),
    );
  }

  public setProps(nextConfigs: ComponentConfigs): void {
    if (!nextConfigs) return;

    /* De-Proxify configs for the flow:CDU reference */
    const oldProps = { ...this.configs };

    /* Merge configs with new props */
    Object.assign(this.configs, nextConfigs);

    this.eventBus.emit("flow:component-did-update", oldProps, this.configs);
  }

  public show(): void {
    const element = this.domService.getElement();
    if (!element) return;

    element!.style.display = "block";
  }

  public hide(): void {
    const element = this.domService.getElement();
    if (!element) return;

    element!.style.display = "none";
  }

  public getElement(): HTMLElement | null {
    return this.domService.getElement();
  }
}
