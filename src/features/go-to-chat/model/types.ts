import { ChatId, ISODateString } from "@shared/api/model/types.ts";
import {
  BaseAttributes,
  BaseConfigs,
  BaseProps,
} from "@shared/lib/Component/model/base.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";

export interface GoToChatProps extends BaseProps {
  configs: GoToChatConfigs;
  attributes?: GoToChatAttributes;
}

export interface GoToChatConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "li">;
  avatar: string;
  userName: string;
  contentText: string;
  date: ISODateString;
  chatId: ChatId
  isNotes?: boolean;
  unreadCount?: number;
}

export interface GoToChatAttributes extends BaseAttributes {
  tabindex: string;
}
