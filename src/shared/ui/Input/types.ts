import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface InputProps extends BaseProps {
  /* Configurations are used for <input> tag inside <label>-wrapper */
  configs: InputConfigs;
  on?: BaseProps["on"];
}

export interface InputConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "label">;
  fieldId: FieldType;
  label: string;
  type: InputType;
  placeholder: string;
  for: FieldType;
  isError?: boolean;
  isSearch?: boolean;
  errorMessage?: string;
  autocomplete?: "on" | "off";
}

export type InputType = "text" | "email" | "password" | "tel";

export type FieldType =
  | "name"
  | "surname"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "display_name"
  | "search"
  | "message"
  | "oldPassword"
  | "newPassword";
