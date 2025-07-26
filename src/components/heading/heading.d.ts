import { IComponentConfigs } from "../../framework/Component/Component.d";

export interface IHeadingConfigs extends IComponentConfigs {
  __text: string;
  __isClickable?: boolean;
  __isDrama?: boolean;
  __link?: Routes;
  class?: string;
}
