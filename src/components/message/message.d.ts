import {
  BaseProps,
  IComponentConfigs,
} from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export type MessageType = "incoming" | "outgoing" | "date";

export interface MessageProps extends BaseProps {
  configs: IMessageConfigs;
  attributes?: BaseProps['attributes'];
}

export interface IMessageConfigs extends IComponentConfigs {
  tagName: Extract<TagNames, "article" | "div">;
  type: MessageType;
  date: string;
  text?: string;
  image?: string;
}
