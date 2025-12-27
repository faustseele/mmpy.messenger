import { ChatId, CreateChatResponse, UserResponse } from "@shared/api/model/types.ts";
import { PageId } from "@pages/page/config/const.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";

export interface MessengerProps extends BaseProps {
  configs: {
    id: PageId.Messenger;
    tagName: Extract<TagNameType, "div">;
    isNotes?: boolean;
    chatId?: ChatId;
    chatTitle?: string;
    participantName?: string;
    participantAvatar?: string;
  };
  on: {
    addChatWithUser?: (
      firstName: string,
      secondName: string,
    ) => Promise<CreateChatResponse | undefined>;
    addNotes: (title: string) => void;
    addUsers: (chatId: ChatId, users: number[]) => Promise<void>;
    closeChat: () => void;
    deleteChat: (chatId: ChatId) => Promise<void>;
    findUser: (login: string) => Promise<UserResponse | null>;
    updateChatAvatar: (chatId: ChatId, file: File) => Promise<void>;
    goToSettings: () => void;
  };
}

export type MessengerMap =
  | "heading_chats"
  | "heading_goToSettings"
  | "searchInput"
  | "addNotesButton"
  | "findUserChatButton"
  | "closeChatButton"
  | "deleteChatButton"
  | "deleteNotesButton"
  | "goToChatItems"
  | "messages"
  | "messageField";

export type MessengerNodes = ChildrenNodes<MessengerMap>;
