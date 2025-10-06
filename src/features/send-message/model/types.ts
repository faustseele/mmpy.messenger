import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentConfigs } from "../../../shared/lib/Component/model/types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";

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
