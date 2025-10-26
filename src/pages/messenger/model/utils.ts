import defaultAvatar from "../../../../static/avatar.png";
import { AppState } from "../../../app/providers/store/Store.ts";
import ChatService from "../../../entities/chat/model/ChatService.ts";
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
  ComponentPatch,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { MessengerPage } from "../ui/MessengerPage.ts";
import { MessengerProps } from "./types.ts";

export const buildMessengerPage: PageFactory<MessengerProps, MessengerPage> = (
  params: ComponentParams<MessengerProps>,
): MessengerPage => {
  if (!params.children) {
    throw new Error("MessengerPage: children is not defined");
  }

  const deps: ComponentDeps<MessengerProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessengerProps, MessengerPage> = {
    params: {
      ...params,
      children: buildChildren(params.children),
    },
    factory: buildMessengerPage,
  };

  return new MessengerPage({
    deps,
    node,
  });
};

function buildCatalogueNodes(apiChats: ChatResponse[]): {
  goToChatNodes: ChildrenNodes;
  goToChatEdge: ChildrenEdges;
} {
  const goToChatNodes: ChildrenNodes = {};
  /* single edge for goToChat items-list {{{ goToChatItems }}} */
  const goToChatEdge: ChildrenEdges = {
    goToChatItems: [],
  };

  // console.log(apiChats)

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
        click: () => ChatService.selectChat(apiChat.id),
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goToChatNodes[id] = goToChatNode as any;
  });

  return { goToChatNodes, goToChatEdge };
}

export const mapMessengerState = (
  state: AppState,
): ComponentPatch<MessengerProps> => {
  const { currentChat, list } = state.api.chats;

  const avatar = currentChat
    ? currentChat.avatar
      ? `${API_URL_RESOURCES}${currentChat.avatar}`
      : defaultAvatar
    : "";

  const headPatch = {
    participantName: currentChat?.title ?? "",
    participantAvatar: avatar,
  };

  const goToChatNodesPatch = buildCatalogueNodes(list ?? []);

  console.log(goToChatNodesPatch);

  if (!goToChatNodesPatch.goToChatNodes) {
    console.error("goToChatNodesPatch is not defined");
  }

  /* removes phantom empty-body-<li> els */
  goToChatNodesPatch.goToChatEdge["goToChatItems"] = Array.from(
    new Set(goToChatNodesPatch.goToChatEdge["goToChatItems"]),
  );

  const { goToChatNodes, goToChatEdge } = goToChatNodesPatch;

  return {
    configs: {
      ...headPatch,
    },
    children: {
      nodes: {
        ...goToChatNodes,
      },
      edges: {
        ...goToChatEdge,
      },
    },
  };
};
