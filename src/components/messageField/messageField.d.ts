import { IComponentConfigs } from "../../framework/Component/Component.d";

export interface IMessageFieldConfigs extends IComponentConfigs {
  id: string;
  type: "text" | "email" | "password" | "tel";
  placeholder?: string;
  __label: string;
  class?: string;
}
