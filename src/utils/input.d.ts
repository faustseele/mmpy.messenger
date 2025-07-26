import { IComponentConfigs } from "../framework/Component/Component.d";

export type TFieldNames =
  | "name"
  | "surname"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "display_name"
  | "search"
  | "message";

export interface IInputConfigs extends IComponentConfigs {
  __label: string;
  __isSearch?: boolean;
  __isError?: boolean;
  __errorMessage?: string;
  placeholder: string;
  id: TFieldNames;
  type: "text" | "email" | "password" | "tel";
  class?: string;
}
