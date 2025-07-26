import { IComponentConfigs } from "../../framework/Component/Component.d";
import { RouteLink } from "../../core/Router/router.d";

export interface IButtonConfigs extends IComponentConfigs {
  type: "button" | "submit";
  class?: string;
  __label: string;
  __modifier?: string;
  __isSilent?: boolean;
  __modifier?: string;
  __link?: RouteLink;
}
