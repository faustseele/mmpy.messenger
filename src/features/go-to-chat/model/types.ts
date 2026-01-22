import { ChatType } from "@/entities/chat/model/types.ts";
import { ChatId, ISODateString } from "@/shared/api/model/api.types";
import {
  BaseConfigs,
  BaseProps,
} from "@shared/lib/Component/model/base.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";

export interface GoToChatProps extends BaseProps {
  configs: GoToChatConfigs;
  on: BaseProps["on"];
}

export interface GoToChatConfigs extends BaseConfigs {
  rootTag: Extract<RootTag, "li">;
  type: ChatType;
  chatId: ChatId;
  avatar: string;
  userName: string;
  contentText: string;
  date: ISODateString;
  unreadCount?: number;
  tabIndex?: string;
}
