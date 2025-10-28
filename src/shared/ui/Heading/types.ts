import { RouteLink } from "../../../app/providers/router/types.ts";
import { BaseAttributes, BaseConfigs, BaseProps } from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

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

interface HeadingAttributes extends BaseAttributes {
  className: string;
}
