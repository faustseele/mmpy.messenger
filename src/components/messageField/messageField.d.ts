import { BaseProps, ComponentConfigs } from "../../framework/Component/component.d";
import { TagNameType } from "../../services/render/DOM/dom.d";

export interface MessageFieldConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "form">;
  id: string;
  type: "text";
  placeholder?: string;
  label: string;
}

export interface MessageFieldProps extends BaseProps {
  configs: MessageFieldConfigs;
  attributes?: BaseProps["attributes"];
}
