import { ChatId, CreateChatResponse, UserResponse } from "@/shared/api/model/api.types";
import { ApiResponse } from "@/shared/api/model/types.ts";
import { PageId } from "@pages/page/config/const.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";

export interface MessengerProps extends BaseProps {
  configs: {
    id: PageId.Messenger;
    tagName: Extract<TagNameType, "div">;
    classNames: string;
    isNotes?: boolean;
    chatId?: ChatId;
    chatTitle?: string;
    participantName?: string;
    participantAvatar?: string;
    isLoadingMessages?: boolean;
  };
  on: {
    addChatWithUser?: (
      firstName: string,
      secondName: string,
    ) => Promise<ApiResponse<CreateChatResponse>>;
    addNotes: (title: string) => void;
    addUsers: (chatId: ChatId, users: number[]) => Promise<void>;
    closeChat: () => void;
    deleteChat: (chatId: ChatId) => Promise<void>;
    findUser: (login: string) => Promise<ApiResponse<UserResponse>>;
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
  | "messageField"
  | "spinner";

export type MessengerNodes = ChildrenNodes<MessengerMap>;
