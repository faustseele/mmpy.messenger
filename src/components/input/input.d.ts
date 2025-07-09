import { ComponentConfigs } from "../../core/Component/Component.d";

export type TFieldNames =
  | "name"
  | "surname"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "message";

export interface IInputData extends ComponentConfigs {
  __label: string;
  __isSearch?: boolean;
  __isError?: boolean;
  __errorMessage?: string;
  placeholder: string;
  id: TFieldNames;
  type: "text" | "email" | "password" | "tel";
  class?: string;
}
