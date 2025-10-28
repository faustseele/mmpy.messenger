import { BaseConfigs, BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";

export interface MessageFieldProps extends BaseProps {
  configs: MessageFieldConfigs;
  attributes?: BaseProps["attributes"];
}

export interface MessageFieldConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "form">;
  id: string;
  label: string;
  type: "text";
  placeholder?: string;
}
