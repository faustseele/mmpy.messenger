import { IComponentAttributes, IComponentConfigs } from "../framework/Component/Component.d";
import { TagNames } from "../services/render/DOM/DOM.d";

/* Configurations are used for <input> tag inside <label>-wrapper */ 
export interface IInputConfigs extends IComponentConfigs {
  slotKey: string;
  tagName: Extract<TagNames, "label">
  label: string;
  type: "text" | "email" | "password" | "tel";
  isError?: boolean;
  id: TFieldNames;
  errorMessage?: string;
  placeholder: string;
}

/* Attributes are used for <label> wrapper-tag */
export interface IInputAttributes extends IComponentAttributes {
  className: string;
  for: TFieldNames;
}

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
