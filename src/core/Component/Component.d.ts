import Component from "./Component.ts";

/* Configuration data for a concrete Component instance */
export type ComponentConfigs = {
  class?: string;
  [key: string]: unknown;
  /* Non-attributes start with '__' */
  __childrenMarkup?: string;
};
/* Event handlers for a concrete Component instance */
export type ComponentEvents = Record<string, () => void>;

export interface ComponentProps {
  configs: ComponentConfigs; 
  events?: ComponentEvents;
}

export type ComponentChildren = Record<string, Component[]>;
