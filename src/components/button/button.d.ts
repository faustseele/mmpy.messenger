import { RouteLink } from "../../core/Router/router.d";
import {
  IComponentAttributes,
  IComponentConfigs,
  IComponentData,
  IComponentFactory,
} from "../../framework/Component/Component.d";

export interface IButtonData extends IComponentData {
  configs: IButtonConfigs;
  componentFactory: IComponentFactory;
  attributes: IButtonAttributes
}

interface IButtonConfigs extends IComponentConfigs {
  slotKey: string;
  label: string;
  tagName: "button";
  type: "button" | "submit";
  isSilent?: boolean;
  modifier?: string;
  link?: RouteLink;
}

export interface IButtonAttributes extends IComponentAttributes {
  type: "button" | "submit";
}
