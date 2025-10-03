import { RouteLink } from "../../../app/providers/router/types.ts";
import { BaseProps } from "../../lib/Component/model/base.types.ts";
import { ComponentAttributes, ComponentConfigs } from "../../lib/Component/model/types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

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
  link?: RouteLink;
}

interface HeadingAttributes extends ComponentAttributes {
  className: string;
}
