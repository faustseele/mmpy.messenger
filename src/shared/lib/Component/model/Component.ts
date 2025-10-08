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

import { AppState } from "../../../../app/providers/store/Store.ts";
import DOMService from "../../DOM/DOMService.ts";
import EventBus from "../../EventBus/EventBus.ts";
import FragmentService from "../../Fragment/FragmentService.ts";
import { proxifyAttributes, proxifyConfigs } from "../lib/utils.ts";
import { BaseProps } from "./base.types.ts";
import {
  ChildrenInstances,
  ChildrenMap,
  ChildrenSchema,
  CombinedChildrenInstances,
} from "./children.types.ts";
import {
  ComponentEventBusEvents,
  ComponentProps,
  SetPropsPayload,
} from "./types.ts";

export default abstract class Component<
  TProps extends BaseProps,
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> {
  protected domService: DOMService<TProps["attributes"], TProps["events"]>;
  protected fragmentService: FragmentService<TProps["configs"]>;

  private _configs: TProps["configs"];
  private _attributes?: TProps["attributes"];
  private _events?: TProps["events"];
  private _childrenSchema?: TSchema;
  private _childrenInstances?: ChildrenInstances<TMap, TSchema>;
  private eventBus: EventBus<ComponentEventBusEvents> = new EventBus();
  public readonly id: string;
  public get configs(): TProps["configs"] {
    return this._configs;
  }
  public get attributes(): TProps["attributes"] {
    return this._attributes;
  }
  public get element(): HTMLElement | null {
    return this.domService.element;
  }
  public get childrenSchema(): TSchema | undefined {
    return this._childrenSchema;
  }
  public get childrenInstances(): ChildrenInstances<TMap, TSchema> | undefined {
    return this._childrenInstances;
  }
  public get childrenCombined():
    | CombinedChildrenInstances<TProps, TMap>
    | undefined {
    const singles = this._childrenInstances?.singles ?? {};
    const lists = this._childrenInstances?.lists ?? {};
    return { ...singles, ...lists } as CombinedChildrenInstances<TProps, TMap>;
  }

  /**
   * Returns the component's HTML structure as a string.
   * Is redefined in Component instantiations to get a layout.
   */
  public getSourceMarkup(): string {
    return ``;
  }

  constructor({
    deps: { domService, fragmentService },
    data: { configs, events, attributes, childrenSchema, childrenInstances },
  }: ComponentProps<TProps, TMap, TSchema>) {
    this.domService = domService;
    this.fragmentService = fragmentService;

    this._configs = proxifyConfigs(configs, this.eventBus);
    this._attributes = proxifyAttributes(attributes ?? {}, this.eventBus);
    this._events = events;
    this._childrenSchema = childrenSchema;
    this._childrenInstances = childrenInstances;

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

  /* Informational. Propagates to childrenCombined */
  private _componentDidMount(): void {
    this.componentDidMount();
  }

  /**
   * This one is called by DOMService
   * after the Parent-Component is added to the DOM (mounted).
   */
  public componentDidMount(): void {
    if (!this.childrenCombined) return;

    /* Recusively mounting childrenCombined on one nested level */
    Object.values(this.childrenCombined).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((child) =>
          child.eventBus.emit("flow:component-did-mount"),
        );
      } else {
        value.eventBus.emit("flow:component-did-mount");
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
    const innerFragment = this.childrenCombined
      ? this.fragmentService.compileWithChildren(
          markup,
          deproxifiedConfigs,
          this.childrenCombined!,
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
   * Propagates to childrenCombined.
   * Called before the Component is removed from the DOM (unmounted).
   */
  public componentDidUnmount(): void {
    this.eventBus.emit("flow:component-did-unmount");

    if (!this.childrenCombined) return;

    /* Recusively mounting childrenCombined on one nested level */

    Object.values(this.childrenCombined).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((child) =>
          child.eventBus.emit("flow:component-did-unmount"),
        );
      } else {
        value.eventBus.emit("flow:component-did-unmount");
      }
    });
  }

  /** Invokes Proxy-setters.
   * New configs -> invoke Proxy-setters
   * New events -> invoke swap listeners
   * @Partial is used in case ComponentConfigs in the props are not defined.
   * TODO: implement proxifed event */
  public setProps<StateSlice extends AppState>(
    nextProps: SetPropsPayload<StateSlice, TProps>,
  ): void {
    if (!nextProps || !nextProps.data) {
      return;
    }

    const nextData = nextProps.data;

    const hasConfigs = !!nextData.configs;
    const hasAttributes = !!nextData.attributes;
    const hasEvents = !!nextData.events;
    const hasChildrenInstances = !!nextData.childrenInstances;

    if (hasConfigs) {
      Object.assign(this._configs, nextData.configs);
    }

    if (hasAttributes) {
      Object.assign(this._attributes ?? {}, nextData.attributes);
    }

    if (hasEvents) {
      const newEvents = Object.assign(this._events ?? {}, nextData.events);

      /* Hot-swap the listeners on the current DOM element */
      if (this.domService.element) {
        this.domService.removeListeners(this._events);
        this.domService.addListeners(newEvents);
      }

      this._events = newEvents;
    }

    if (hasChildrenInstances) {
      Object.assign(this._childrenInstances ?? {}, nextData.childrenInstances);
    }
  }

  /**
   * DOMService helper.
   * Makes the Component visible
   */
  public show(): void {
    const element = this.domService.element;
    if (!element) return;

    // element!.style.display = "flex";
  }

  /** DOMService helper
   * Makes the Component invisible */
  public hide(): void {
    const element = this.domService.element;
    if (!element) return;

    element!.style.display = "none";
  }
}
