import { IComponentConfigs, IComponentData } from "../../framework/Component/Component.d";

export interface IHeadingData extends IComponentData {
  configs: IHeadingConfigs;
  componentFactory: IComponentFactory;
}

interface IHeadingConfigs extends IComponentConfigs {
  slotKey: string;
  tagName: "h1" | "h2" | "h3";
  type: string;
  text: string;
  isClickable?: boolean;
  isDrama?: boolean;
  link?: Routes;
}
