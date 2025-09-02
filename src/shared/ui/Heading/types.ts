import { ComponentAttributes, ComponentConfigs } from "../../../../framework/Component/component";
import { TagNameType } from "../../../../services/render/DOM/dom";

export interface HeadingProps extends BaseProps {
  configs: HeadingConfigs;
  attributes: HeadingAttributes;
}

export interface HeadingConfigs extends ComponentConfigs {
  slotKey: string;
  tagName: Extract<TagNameType, "h1" | "h2" | "h3">
  type: string;
  text: string;
  isClickable?: boolean;
  isDrama?: boolean;
  link?: Routes;
}

interface HeadingAttributes extends ComponentAttributes {
  className: string;
}
