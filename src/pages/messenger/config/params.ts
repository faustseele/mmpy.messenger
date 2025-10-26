/* eslint-disable @typescript-eslint/no-explicit-any */
import participantAvatar from "../../../../static/avatar.png";
import {
  RouteConfigs,
  RouteLink,
} from "../../../app/providers/router/types.ts";
import { connect } from "../../../app/providers/store/connect.ts";
import {
  createMessage,
  getMessageParams,
} from "../../../entities/message-bubble/model/utils.ts";
import {
  buildGoToChat,
  getGoToChatParams,
} from "../../../features/go-to-chat/model/utils.ts";
import {
  createMessageField,
  getMessageFieldParams,
} from "../../../features/send-message/model/utils.ts";
import { ComponentParams } from "../../../shared/lib/Component/model/types.ts";
import {
  buildButton,
  getButtonProps,
} from "../../../shared/ui/Button/utils.ts";
import {
  buildHeading,
  getHeadingProps,
} from "../../../shared/ui/Heading/utils.ts";
import { buildInput, getInputProps } from "../../../shared/ui/Input/utils.ts";
import { PageId } from "../../page/config/const.ts";
import { PageNode } from "../../page/model/types.ts";
import cssPage from "../../page/ui/page.module.css";
import { MessengerProps } from "../model/types.ts";
import { buildMessengerPage, mapMessengerState } from "../model/utils.ts";
import { MessengerPage } from "../ui/MessengerPage.ts";
import cssMessenger from "../ui/messenger.module.css";

const messengerPageParams: ComponentParams<MessengerProps> = {
  configs: {
    id: PageId.Messenger,
    tagName: "div",
    participantAvatar,
    participantName: "",
  } as any,
  attributes: {
    className: `${cssPage.moduleWindow} ${cssMessenger.moduleWindow_messenger}`,
  },
  children: {
    nodes: {
      heading_chats: {
        params: getHeadingProps({
          id: "heading_chats",
          type: "catalogue-title",
          text: "Чаты 👥",
        }),
        factory: buildHeading as any,
      },
      heading_goToSettings: {
        params: getHeadingProps({
          id: "heading_goToSettings",
          type: "catalogue-link",
          text: "Профиль ➛",
          isClickable: true,
          link: RouteLink.Settings,
        }),
        factory: buildHeading as any,
      },
      searchInput: {
        params: getInputProps({
          id: "searchInput",
          fieldId: "search",
          label: "Поиск",
          type: "text",
          placeholder: "Поиск",
          isSearch: true,
        }),
        factory: buildInput as any,
      },
      deleteChatButton: {
        params: getButtonProps({
          id: "deleteChatButton",
          label: "Удалить 🔥",
          isSilent: true,
          link: RouteLink.NotFound,
        }),
        factory: buildButton as any,
      },
      closeChatButton: {
        params: getButtonProps({
          id: "closeChatButton",
          label: "Закрыть ❌",
          isSilent: true,
        }),
        factory: buildButton as any,
      },
      addChatButton: {
        params: getButtonProps({
          id: "addChatButton",
          label: "Добавить чат 💬",
        }),
        factory: buildButton as any,
      },
      messageField: {
        params: getMessageFieldParams({
          id: "messageField",
          label: "Сообщение",
          placeholder: "Сообщение",
        }),
        factory: createMessageField as any,
      },
      goToChatItem_1: {
        params: getGoToChatParams({
          id: "goToChatItem_1",
          avatar: participantAvatar,
          userName: "Андрей",
          contentText: "Привет! Это демо-чат.",
          chatId: -1111,
          date: "10:25",
          unreadCount: 2,
        }),
        factory: buildGoToChat as any,
      },
      // A couple of demo messages
      message_1: {
        params: getMessageParams({
          id: "message_1",
          text: "Привет! Это демо-чат.",
          date: "10:25",
          type: "incoming",
        }),
        factory: createMessage as any,
      },
      message_2: {
        params: getMessageParams({
          id: "message_2",
          text: "Всё отлично!",
          date: "10:26",
          type: "outgoing",
        }),
        factory: createMessage as any,
      },
    },
    edges: {
      heading_chats: "heading_chats",
      heading_goToSettings: "heading_goToSettings",
      searchInput: "searchInput",
      deleteChatButton: "deleteChatButton",
      closeChatButton: "closeChatButton",
      addChatButton: "addChatButton",
      messageField: "messageField",
      goToChatItems: ["goToChatItem_1"],
      messages: ["message_1", "message_2"],
    },
  },
};

export const messengerPageNode: PageNode<MessengerProps, MessengerPage> = {
  params: messengerPageParams,
  factory: buildMessengerPage as any,
};

export const messengerPageRouteConfig: RouteConfigs = {
  path: RouteLink.Messenger,
  rootQuery: "#app",
  authStatus: "protected",
  params: {},
};

export const createMessengerPage = () =>
  connect(messengerPageNode, mapMessengerState);
