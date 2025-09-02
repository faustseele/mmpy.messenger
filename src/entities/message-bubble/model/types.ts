import {
  BaseProps,
  ComponentConfigs,
} from "../../framework/Component/component.d";
import { TagNameType } from "../../services/render/DOM/dom.d";

export type MessageType = "incoming" | "outgoing" | "date";

export interface MessageProps extends BaseProps {
  configs: MessageConfigs;
  attributes?: BaseProps['attributes'];
}

export interface MessageConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "article" | "div">;
  type: MessageType;
  date: string;
  text?: string;
  image?: string;
}
