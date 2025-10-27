/* eslint-disable @typescript-eslint/no-explicit-any */
import participantAvatar from "../../../../static/avatar.png";
import {
  RouteConfigs,
  RouteLink,
} from "../../../app/providers/router/types.ts";
import { connect } from "../../../app/providers/store/connect.ts";
import { getMessageFieldNode } from "../../../features/send-message/model/utils.ts";
import { ComponentParams } from "../../../shared/lib/Component/model/types.ts";
import {
  getButtonNode
} from "../../../shared/ui/Button/utils.ts";
import {
  getHeadingNode
} from "../../../shared/ui/Heading/utils.ts";
import { getInputNode } from "../../../shared/ui/Input/utils.ts";
import { PageId } from "../../page/config/const.ts";
import { PageNode } from "../../page/model/types.ts";
import cssPage from "../../page/ui/page.module.css";
import { mapMessengerState } from "../model/map.ts";
import { MessengerProps } from "../model/types.ts";
import { buildMessengerPage } from "../model/utils.ts";
import { MessengerPage } from "../ui/MessengerPage.ts";
import cssMessenger from "../ui/messenger.module.css";

const messengerPageParams: ComponentParams<MessengerProps> = {
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
      addChatButton: getButtonNode({
        id: "addChatButton",
        label: "Добавить чат 💬",
        tooltip: "Создать новый чат",
      }) as any,
      addUserButton: getButtonNode({
        id: "addUserButton",
        label: "Добавить 👤",
        tooltip: "Добавить пользователя",
      }) as any,
      closeChatButton: getButtonNode({
        id: "closeChatButton",
        label: "❌",
        isSilent: true,
        tooltip: "Закрыть чат",
      }) as any,
      deleteChatButton: getButtonNode({
        id: "deleteChatButton",
        label: "Удалить 💬",
        isSilent: true,
        tooltip: "Удалить чат",
      }) as any,
      deleteUserButton: getButtonNode({
        id: "deleteUserButton",
        label: "Удалить 👤",
        isSilent: true,
        tooltip: "Удалить пользователя",
      }) as any,
      messageField: getMessageFieldNode({
        id: "messageField",
        label: "Сообщение",
        placeholder: "Сообщение",
      }) as any,
    },
    edges: {
      heading_chats: "heading_chats",
      heading_goToSettings: "heading_goToSettings",
      searchInput: "searchInput",
      addChatButton: "addChatButton",
      addUserButton: "addUserButton",
      closeChatButton: "closeChatButton",
      deleteUserButton: "deleteUserButton",
      deleteChatButton: "deleteChatButton",
      messageField: "messageField",
      goToChatItems: [],
      messages: [],
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
