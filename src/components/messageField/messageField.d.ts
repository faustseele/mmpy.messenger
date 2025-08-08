import { BaseProps, IComponentConfigs } from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export interface IMessageFieldConfigs extends IComponentConfigs {
  tagName: Extract<TagNames, "form">;
  id: string;
  type: "text";
  placeholder?: string;
  label: string;
}

export interface MessageFieldProps extends BaseProps {
  configs: IMessageFieldConfigs;
  attributes?: BaseProps["attributes"];
}
