import { RouteLink } from "../../../app/providers/router/types.ts";
import { BaseProps } from "../../lib/Component/model/base.types.ts";
import { ComponentAttributes, ComponentConfigs } from "../../lib/Component/model/types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface ButtonProps extends BaseProps {
  configs: ButtonConfigs;
  attributes?: ButtonAttributes;
  events?: BaseProps["events"];
} 

export interface ButtonConfigs extends ComponentConfigs {
  slotKey: string;
  label: string;
  tagName: Extract<TagNameType, "button">;
  type: "button" | "submit";
  modifier?: string;
  link?: RouteLink;
}

export interface ButtonAttributes extends ComponentAttributes {
  type: "button" | "submit";
}
