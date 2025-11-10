import { BaseAttributes, BaseConfigs, BaseProps } from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";
import { RouteLink } from "../../types/universal.ts";

export interface HeadingProps extends BaseProps {
  configs: HeadingConfigs;
  attributes: HeadingAttributes;
}

export interface HeadingConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "h1">
  text: string;
  isClickable?: boolean;
  isDrama?: boolean;
  link?: RouteLink;
}

export interface HeadingAttributes extends BaseAttributes {
  className: string;
}

export interface HeadingOn {
  click?: () => void;
}
