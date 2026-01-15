import { ChatId, ISODateString } from "@/shared/api/model/api.types";
import {
  BaseConfigs,
  BaseProps,
} from "@shared/lib/Component/model/base.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";

export interface GoToChatProps extends BaseProps {
  configs: GoToChatConfigs;
}

export interface GoToChatConfigs extends BaseConfigs {
  rootTag: Extract<RootTag, "li">;
  classNames: string;
  avatar: string;
  userName: string;
  contentText: string;
  date: ISODateString;
  chatId: ChatId;
  isNotes?: boolean;
  unreadCount?: number;
  tabIndex?: string;
}
