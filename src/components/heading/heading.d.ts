import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IHeadingData extends ComponentConfigs {
  __text: string;
  __isClickable?: boolean;
  __isDrama?: boolean;
  __link?: Routes;
  class?: string;
}
