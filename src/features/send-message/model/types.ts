import { BaseConfigs, BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";

export interface MessageFieldProps extends BaseProps {
  configs: MessageFieldConfigs;
  on: {
    sendMessage: (text: string) => void;
    submit?: (e: Event) => void;
  }
}

export interface MessageFieldConfigs extends BaseConfigs {
  id: string;
  tagName: Extract<TagNameType, "form">;
  classNames: string;
  label: string;
  type: "text";
  placeholder?: string;
}
