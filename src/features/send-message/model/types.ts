import { ApiResponse } from "@/shared/api/model/types.ts";
import {
  BaseConfigs,
  BaseProps,
} from "@shared/lib/Component/model/base.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";

export interface MessageFieldProps extends BaseProps {
  configs: MessageFieldConfigs;
  on: {
    sendMessage: (text: string) => ApiResponse<undefined>;
    submit?: (e: Event) => void;
  };
}

export interface MessageFieldConfigs extends BaseConfigs {
  id: string;
  rootTag: Extract<RootTag, "form">;
  classNames: string;
  label: string;
  type: "text";
  placeholder?: string;
}
