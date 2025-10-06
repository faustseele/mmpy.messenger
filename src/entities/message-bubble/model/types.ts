import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentConfigs } from "../../../shared/lib/Component/model/types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";

export type MessageType = "incoming" | "outgoing" | "date";

export interface MessageProps extends BaseProps {
  configs: MessageConfigs;
  attributes?: BaseProps["attributes"];
}

export interface MessageConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "article" | "div">;
  type: MessageType;
  date: string;
  text?: string;
  image?: string;
}
