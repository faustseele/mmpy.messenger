/* eslint-disable no-unused-vars */
/* ...params are used */
import Component from "./Component.ts";

/* Configuration data for a concrete Component instance */
export type ComponentConfigs = {
  class?: string;
  [key: string]: unknown;
  /* Non-attributes start with '__' */
  __childrenMarkup?: string;
};
/* Event handlers for a concrete Component instance */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentEvents = { [key: string]: any };
/* export type ComponentEvents = Partial<
  Record<BrowserEventKeys, (event: Event) => void>
>; */

export interface ComponentProps {
  configs: ComponentConfigs;
  events?: ComponentEvents;
}

export interface ComponentPropsForCDU extends ComponentProps {
  configs?: ComponentConfigs;
  events?: ComponentEvents;
}

export type ComponentChildren = Record<string, Component[]>;

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
