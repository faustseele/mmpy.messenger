import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "../../../shared/lib/Component/model/children.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { PageId } from "../../page/config/const.ts";

export interface MessengerProps extends BaseProps {
  configs: {
    id: PageId.Messenger;
    tagName: Extract<TagNameType, "div">;
    participantName?: string;
    participantAvatar?: string;
  };
}

export type MessengerMap =
  | "heading_chats"
  | "heading_goToSettings"
  | "searchInput"
  | "deleteChatButton"
  | "closeChatButton"
  | "addChatButton"
  | "newChatInput"
  | "goToChatItems"
  | "messages"
  | "messageField"

export type MessengerNodes = ChildrenNodes<MessengerMap>;
