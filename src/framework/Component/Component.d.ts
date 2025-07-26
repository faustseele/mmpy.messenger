/* eslint-disable no-unused-vars */
/* ...params are used */
import Component from "./Component.ts";

/**
 * A generic constructor type for concrete Component implementation.
 * Expects to receive a props object during instantiation.
 * @Generic (T extends Component) is used to include
 * * inheritors of the Component to the T-definition.
 * @DefaultType 'Component' is used to avoid providing a specific type in <>.
 * * It's useful bc we only care that sth is a Component, but not of a certain specific type.
 */
export type ComponentConstructor<P extends ComponentProps = ComponentProps> =
  new (
    props: P,
    childrenMap: IComponentChildren,
    domService: DOMService,
    fragmentService: FragmentService,
  ) => T;

/* The shape of the props-object that every Component receives. */
export interface ComponentProps<
  P extends IComponentConfigs = IComponentConfigs,
> {
  configs: P;
  events?: IComponentEvents;
}

/* Configuration data for a concrete Component instance */
export interface IComponentConfigs {
  class?: string;
  [key: string]: unknown;
  /* Non-attributes start with '__' */
  __childrenMarkup?: string;
}

/* Event handlers for a concrete Component instance */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IComponentEvents = Record<string, (event: Event) => void>;
/* export type IComponentEvents = Partial<
  Record<BrowserEventKeys, (event: Event) => void>
>; */

export type IComponentChildren = Record<string, Component[] | Component>;

export type BrowserEventKeys =
  // Form Events
  | "submit"
  | "reset"
  | "change"
  | "input"

  // Mouse Events
  | "click"
  | "dblclick"
  | "mousedown"
  | "mouseup"
  | "mouseover"
  | "mouseout"
  | "mousemove"
  | "contextmenu"

  // Keyboard Events
  | "keydown"
  | "keyup"
  | "keypress"

  // Focus Events
  | "focus"
  | "blur"

  // Window & Document Events
  | "load"
  | "DOMContentLoaded"
  | "resize"
  | "scroll";
