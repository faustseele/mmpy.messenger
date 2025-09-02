import { RouteLink } from "../../../app/providers/router/types";
import {
  ComponentAttributes,
  ComponentConfigs
} from "../../../framework/Component/component";
import { TagNameType } from "../../../services/render/DOM/dom";

export interface ButtonProps extends BaseProps {
  configs: ButtonConfigs;
  attributes?: ButtonAttributes;
  events?: BaseProps["events"];
  childrenData?: BaseProps["childrenData"];
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
