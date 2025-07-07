import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IInputData extends ComponentConfigs {
  __label: string;
  __isSearch?: boolean;
  __isError?: boolean;
  __errorMessage?: string;
  placeholder: string;
  id: string;
  type: "text" | "email" | "password" | "tel";
  class?: string;
}
