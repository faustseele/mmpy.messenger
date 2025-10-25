import { TagNameType } from "../../DOM/types.ts";
import { ComponentId } from "./types.ts";

/**
 * public contract of fundamental Component props
 */
export interface BaseProps {
  /* basic Component configuration */
  configs: BaseConfigs;
  /* DOM-attributes for the generated in DOMService root tag */
  attributes?: BaseAttributes;
  /* event handlers */
  on?: BaseOn;
}

export type BaseConfigs = {
  readonly id: ComponentId;
  /* Component's root tag */
  readonly tagName: TagNameType;
  type?: string;
};

export type BaseAttributes = {
  className?: string;
  type?: string;
  style?: string;
  for?: string;
};

export type BaseOn = {
  [key: string]: (event: Event) => void;
};
