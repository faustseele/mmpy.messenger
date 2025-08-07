import { IComponentData, IComponentFactory } from "../framework/Component/Component.d";

export interface IInputData extends IComponentData {
  configs: IInputConfigs;
  componentFactory: IComponentFactory;
  attributes: {
    type: "text" | "email" | "password" | "tel";
    id: TFieldNames;
    placeholder: string;
  };
}

interface IInputConfigs extends IComponentConfigs {
  slotKey: string;
  tagName: "input";
  label: string;
  type: "text" | "email" | "password" | "tel";
  isError?: boolean;
  errorMessage?: string;
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
