import { RouteLink } from "../../core/Router/router.d";
import {
  IComponentAttributes,
  IComponentConfigs
} from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export interface ButtonProps extends BaseProps {
  configs: IButtonConfigs;
  attributes?: IButtonAttributes;
  events?: BaseProps["events"];
  childrenData?: BaseProps["childrenData"];
} 

export interface IButtonConfigs extends IComponentConfigs {
  slotKey: string;
  label: string;
  tagName: Extract<TagNames, "button">;
  type: "button" | "submit";
  modifier?: string;
  link?: RouteLink;
}

export interface IButtonAttributes extends IComponentAttributes {
  type: "button" | "submit";
}
