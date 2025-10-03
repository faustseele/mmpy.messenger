import { ComponentAttributes, ComponentConfigs, ComponentEvents } from "./types.ts";

/**
 * Public-facing API of a Component instance.
 * Defines the fundamental public contract for a Component's properties.
 */
export interface BaseProps {
  configs: ComponentConfigs;
  attributes?: ComponentAttributes;
  events?: ComponentEvents;
}
