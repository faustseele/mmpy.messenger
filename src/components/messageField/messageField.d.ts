import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IMessageFieldData extends ComponentConfigs {
  id: string;
  type: "text" | "email" | "password" | "tel";
  placeholder?: string;
  __label: string;
  class?: string;
}
