import { BaseConfigs, BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";

export type MessageType = "incoming" | "outgoing" | "date";

export interface MessageProps extends BaseProps {
  configs: MessageConfigs;
}

export interface MessageConfigs extends BaseConfigs {
  rootTag: Extract<RootTag, "article">;
  type: MessageType;
  date: string;
  text?: string;
  image?: string;
}
