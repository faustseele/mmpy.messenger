import { ComponentConfigs } from "../../core/Component/Component.d";
import { Routes } from "../../core/Router/routes.d";

export interface IButtonData extends ComponentConfigs {
  type: "button" | "submit";
  class?: string;
  __label: string;
  __modifier?: string;
  __isSilent?: boolean;
  __modifier?: string;
  __link?: Routes;
}
