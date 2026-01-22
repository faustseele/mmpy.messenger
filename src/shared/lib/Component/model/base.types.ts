import { RootTag } from "../../DOM/types.ts";
import { ComponentId } from "./types.ts";

/**
 * public contract of fundamental Component props
 */
export interface BaseProps {
  /** basic Component configuration
   * rendered into markup via Handlebars {{config-expressions}} in getInnerMarkup()
   * ex.1- configs: { name } -> <p> {{ name }} </p>
   * ex.2- configs: { info: date  } -> <span> {{ info.date }} </span>
   */
  configs: BaseConfigs;
  /* event handlers */
  on?: BaseOn;
}

export type BaseConfigs = {
  readonly id: ComponentId;
  /* Component's root tag */
  readonly rootTag: RootTag;
  /* classes separated by space */
  classNames: string;
  type?: string;
};

export type BaseOn = {
  /* accepting literally any function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => any;
};
