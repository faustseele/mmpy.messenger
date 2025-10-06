import { ComponentConfigs, ComponentAttributes } from "../../Component/model/types.ts";
import { TagNameType } from "../../DOM/types.ts";

/* Configurations are used for <input> tag inside <label>-wrapper */ 
export interface InputConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "label">
  label: string;
  type: "text" | "email" | "password" | "tel";
  isError?: boolean;
  name: FieldType;
  id: FieldType;
  errorMessage?: string;
  placeholder: string;
}

/* Attributes are used for <label> wrapper-tag */
export interface InputAttributes extends ComponentAttributes {
  className: string;
  for: FieldType;
}

export type FieldType =
  | "name"
  | "surname"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "display_name"
  | "search"
  | "message";
