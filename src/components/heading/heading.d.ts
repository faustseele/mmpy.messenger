import { IComponentAttributes, IComponentConfigs } from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export interface HeadingProps extends BaseProps {
  configs: IHeadingConfigs;
  attributes: IHeadingAttributes;
}

export interface IHeadingConfigs extends IComponentConfigs {
  slotKey: string;
  tagName: Extract<TagNames, "h1" | "h2" | "h3">
  type: string;
  text: string;
  isClickable?: boolean;
  isDrama?: boolean;
  link?: Routes;
}

interface IHeadingAttributes extends IComponentAttributes {
  className: string;
}
