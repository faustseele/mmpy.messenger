import Store from "../../../app/providers/store/Store.ts";
import ChatService from "../../../entities/chat/model/ChatService.ts";
import {
  createMessage,
  getMessageParams,
} from "../../../entities/message-bubble/model/utils.ts";
import { getGoToChatNodeWithInstance } from "../../../features/go-to-chat/model/utils.ts";
import { ChatResponse } from "../../../shared/api/model/types.ts";
import { API_URL_RESOURCES } from "../../../shared/config/urls.ts";
import {
  ChildrenEdges,
  ChildrenNodes,
} from "../../../shared/lib/Component/model/children.types.ts";
import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { hhmmDate } from "../../../shared/lib/helpers/formatting/date.ts";
import { getChatNumber } from "../../../shared/lib/helpers/formatting/string.ts";
import { MessengerPage } from "../ui/MessengerPage.ts";
import { MessengerProps } from "./types.ts";

export function getNewChatPlaceholder() {
  return `Чат № ${getChatNumber()}`;
}

export const buildMessengerPage: PageFactory<MessengerProps, MessengerPage> = (
  params: ComponentParams<MessengerProps>,
): MessengerPage => {
  const deps: ComponentDeps<MessengerProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessengerProps, MessengerPage> = {
    params,
    factory: buildMessengerPage,
  };

  return new MessengerPage({
    deps,
    node,
  });
};

export function buildCatalogueNodes(apiChats: ChatResponse[]): {
  goToChatNodes: ChildrenNodes;
  goToChatEdge: ChildrenEdges;
} {
  const goToChatNodes: ChildrenNodes = {};
  /* single edge for goToChat items-list {{{ goToChatItems }}} */
  const goToChatEdge: ChildrenEdges = {
    goToChatItems: [],
  };
  const goToChatItems = goToChatEdge.goToChatItems as ComponentId[];

  apiChats.forEach((apiChat) => {
    const id = `goToChatItem_${apiChat.id}`;
    goToChatItems.push(id);

    const avatar = apiChat.avatar
      ? `${API_URL_RESOURCES}${apiChat.avatar}`
      : "";
    const lastMsg = apiChat.last_message;
    const contentText = lastMsg?.content ?? "";
    const date = lastMsg?.time ?? "";
    const unreadCount = apiChat.unread_count;

    const goToChatNode = getGoToChatNodeWithInstance(
      {
        id,
        avatar,
        userName: apiChat.title,
        contentText,
        date,
        unreadCount,
        chatId: apiChat.id,
      },
      {
        click: () => {
          ChatService.selectChat(apiChat.id);
        },
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goToChatNodes[id] = goToChatNode as any;
  });

  return { goToChatNodes, goToChatEdge };
}

export function buildMessageNodes(): {
  messageNodes: ChildrenNodes;
  messageEdge: ChildrenEdges;
} {
  const state = Store.getState();

  const activeId = state.api.chats.activeId;
  const byChat = state.api.chats.messagesByChatId || {};
  const rawMessages = activeId ? byChat[activeId] || [] : [];
  const myId = state.api.auth.user?.id;

  const messageNodes: ChildrenNodes = {};
  /* single edge for messages items-list {{{ messages }}} */
  const messageEdge: ChildrenEdges = {
    messages: [],
  };
  const messages = messageEdge.messages as ComponentId[];

  rawMessages.forEach((msg) => {
    const id = `message_${msg.id}`;
    const type = msg.user_id === myId ? "outgoing" : "incoming";
    const date = hhmmDate(msg.time);

    messageNodes[id] = {
      params: getMessageParams({
        id,
        text: msg.content,
        type,
        date,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      factory: createMessage as any,
    };

    messages.push(id);
  });

  return { messageNodes, messageEdge };
}
