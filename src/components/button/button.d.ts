import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IButtonData extends ComponentConfigs {
  type: "button" | "submit";
  __label: string;
  __modifier?: string;
  __isSilent?: boolean;
  __modifier?: string;
  class?: string;
}
