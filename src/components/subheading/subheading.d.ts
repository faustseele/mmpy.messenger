import { IComponentConfigs } from "../../framework/Component/Component.d";

export interface ISubheadingConfigs extends IComponentConfigs {
  __text: string;
  __isDrama?: boolean;
  class?: string;
}
