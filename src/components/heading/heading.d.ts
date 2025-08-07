import { IComponentConfigs } from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export interface IHeadingConfigs extends IComponentConfigs {
  slotKey: string;
  tagName: Extract<TagNames, "h1" | "h2" | "h3">
  type: string;
  text: string;
  isClickable?: boolean;
  isDrama?: boolean;
  link?: Routes;
}
