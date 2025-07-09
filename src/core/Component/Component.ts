import EventBus from "../../services/events/EventBus.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import type {
  ComponentChildren,
  ComponentConfigs,
  ComponentEvents,
  ComponentProps,
  ComponentPropsForCDU,
} from "./Component.d";

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

export default abstract class Component {
  protected domService: DOMService;
  protected fragmentService: FragmentService;

  private eventBus: EventBus = new EventBus();

  public readonly id: string;
  public props: ComponentProps;
  public configs: ComponentConfigs;
  public childrenMap: ComponentChildren = {};
  public events: ComponentEvents;

  /* Is redefined in Component instantiations
    to get a layout */
  public abstract getSourceMarkup(): string;

  constructor(
    props: ComponentProps,
    childrenMap: ComponentChildren,

    /* Dependencies modules */
    domService: DOMService,
    fragmentService: FragmentService,
  ) {
    this.props = props;
    const { configs = {}, events = {} } = props;
    this.events = events;
    this.childrenMap = childrenMap;

    this.configs = this._proxifyConfigs(configs);

    this.domService = domService;
    this.fragmentService = fragmentService;

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
    // console.log(this, "componentDidMount");
    this.componentDidMount();
  }

  /* This one is called by DOMService
    after the Parent-Component is mounted */
  public componentDidMount(): void {
    /* Recusively mounting children on one nested level */
    Object.values(this.childrenMap).forEach((childrenGroup) => {
      if (Array.isArray(childrenGroup)) {
        childrenGroup.forEach((child) =>
          child.eventBus.emit("flow:component-did-mount"),
        );
      } else {
        childrenGroup.eventBus.emit("flow:component-did-mount");
      }
    });
  }

  /* On _initComponent & CDM; On CDU */
  private _componentDidRender(): void {
    /* Create the Component Element */
    this.domService.createElement();

    /* Get the HTMLElement from DOMService */
    const element = this.domService.getElement();
    if (!element) return;

    /* Get a compiled (innerHTML) DocumentFragment from FragmentService */
    const innerFragment = this.fragmentService.compile(
      this.getSourceMarkup(),
      { ...this.configs } /* De-Proxy configs */,
      this.childrenMap,
    );

    this.domService.removeListeners(this.events);

    /* DOMService renders: handles innerHTML and appendChild */
    this.domService.insertFragmentIntoElement(innerFragment); //

    this.domService.addListeners(this.events);
  }

  /* Is redefined in concrete Components */
  public componentDidRender(): void {}

  /* A go-to -> CDR */
  private _componentDidUpdate(): void {
    this.eventBus.emit("flow:render");
  }

  /* Removes listeners */
  private _componentDidUnmount(): void {
    this.domService.removeListeners(this.events);
  }

  /* This one is called by Router on new Component-Page.
    Propagates to childrenMap */
  public componentDidUnmount(): void {
    this.eventBus.emit("flow:component-did-unmount");

    /* Recusively mounting children on one nested level */
    Object.values(this.childrenMap).forEach((childrenGroup) => {
      if (Array.isArray(childrenGroup)) {
        childrenGroup.forEach((child) =>
          child.eventBus.emit("flow:component-did-unmount"),
        );
      } else {
        childrenGroup.eventBus.emit("flow:component-did-unmount");
      }
    });
  }

  /* Implementing Reactivity through Proxy. Emits 'CDU' */
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

  /* Invokes Proxy-setters.
    New configs -> invoke Proxy-setters
    New events -> invoke swap listeners
    TODO: implement proxifed event */
  public setProps(nextProps: ComponentPropsForCDU): void {
    if (!nextProps) return;

    const hasConfigs = nextProps.configs !== undefined;
    const hasEvents = nextProps.events !== undefined;

    if (hasConfigs) {
      Object.assign(this.configs, nextProps.configs);
    }

    if (hasEvents) {
      const newEvents = Object.assign(this.events, nextProps.events);

      /* Hot-swap the listeners on the current DOM element */
      if (this.domService.element) {
        this.domService.removeListeners(this.events);
        this.domService.addListeners(newEvents);
      }

      this.events = newEvents;
    }

    // Also update the base props object
    Object.assign(this.props, nextProps);
  }

  /* DOMService helper */
  public show(): void {
    const element = this.domService.getElement();
    if (!element) return;

    element!.style.display = "block";
  }

  /* DOMService helper */
  public hide(): void {
    const element = this.domService.getElement();
    if (!element) return;

    element!.style.display = "none";
  }

  /* DOMService helper */
  public getElement(): HTMLElement | null {
    return this.domService.getElement();
  }
}
