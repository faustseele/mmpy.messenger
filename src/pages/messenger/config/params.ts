/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAddUsers, handleCloseChat, handleCreateChat, handleDeleteChat, handleUpdateChatAvatar } from "@entities/chat/model/actions.ts";
import { RouteConfigs } from "@app/providers/router/types.ts";
import { getMessageFieldNode } from "@features/send-message/model/factory.ts";
import { PageId } from "@pages/page/config/const.ts";
import cssPage from "@pages/page/ui/page.module.css";
import { ROOT_QUERY } from "@shared/config/dom.ts";
import { ComponentParams } from "@shared/lib/Component/model/types.ts";
import { RouteLink } from "@shared/types/universal.ts";
import { getButtonNode } from "@shared/ui/Button/utils.ts";
import { getHeadingNode } from "@shared/ui/Heading/utils.ts";
import { getInputNode } from "@shared/ui/Input/utils.ts";
import participantAvatar from "../../../../static/avatar.png";
import {
  handleFindUser,
  handleGoToSettings,
} from "../model/actions.ts";
import { MessengerProps } from "../model/types.ts";
import cssMessenger from "../ui/messenger.module.css";

export const messengerPageParams: ComponentParams<MessengerProps> = {
  configs: {
    id: PageId.Messenger,
    tagName: "div",
    participantAvatar,
    participantName: "",
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssMessenger.moduleWindow_messenger}`,
  },
  children: {
    nodes: {
      heading_chats: getHeadingNode({
        id: "heading_chats",
        type: "catalogue-title",
        text: "Чаты 👥",
      }) as any,
      heading_goToSettings: getHeadingNode({
        id: "heading_goToSettings",
        type: "catalogue-link",
        text: "Профиль ➛",
        isClickable: true,
        link: RouteLink.Settings,
      }) as any,
      searchInput: getInputNode({
        id: "searchInput",
        fieldId: "search",
        label: "Поиск",
        type: "text",
        placeholder: "Поиск",
        isSearch: true,
      }) as any,
      addNotesButton: getButtonNode({
        id: "addNotesButton",
        label: "Заметкa ✏️",
        tooltip: "Добавить новые заметки",
      }) as any,
      findUserChatButton: getButtonNode({
        id: "findUserChatButton",
        label: "Найти пользователя 👤",
        tooltip: "Найти пользователя по логину",
      }) as any,
      closeChatButton: getButtonNode({
        id: "closeChatButton",
        label: "❌",
        isSilent: true,
        tooltip: "Закрыть чат",
      }) as any,
      deleteNotesButton: getButtonNode({
        id: "deleteNotesButton",
        label: "Сжечь заметки 🔥",
        isSilent: true,
        tooltip: "Стереть заметки",
      }) as any,
      deleteChatButton: getButtonNode({
        id: "deleteChatButton",
        label: "Удалить чат 👤",
        isSilent: true,
        tooltip: "Удалить чат с пользователем",
      }) as any,
      messageField: getMessageFieldNode("messageField") as any,
    },
    edges: {
      heading_chats: "heading_chats",
      heading_goToSettings: "heading_goToSettings",
      searchInput: "searchInput",
      addNotesButton: "addNotesButton",
      findUserChatButton: "findUserChatButton",
      closeChatButton: "closeChatButton",
      deleteChatButton: "deleteChatButton",
      deleteNotesButton: "deleteNotesButton",
      messageField: "messageField",
      goToChatItems: [],
      messages: [],
    },
  },
  on: {
    addChatWithUser: (firstName: string, secondName: string) =>
      handleCreateChat(`{${firstName} ${secondName}}`),
    addNotes: handleCreateChat,
    addUsers: handleAddUsers,
    closeChat: handleCloseChat,
    deleteChat: handleDeleteChat,
    findUser: handleFindUser,
    updateChatAvatar: handleUpdateChatAvatar,
    goToSettings: handleGoToSettings,
  },
};

export const messengerPageRouteConfig: RouteConfigs = {
  path: RouteLink.Messenger,
  rootQuery: ROOT_QUERY,
  authStatus: "protected",
  params: {},
};
