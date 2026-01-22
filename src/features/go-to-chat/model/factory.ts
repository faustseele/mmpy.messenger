import { ChatType } from "@/entities/chat/model/types.ts";
import { ChatResponse, ISODateString } from "@/shared/api/model/api.types.ts";
import { handleSelectChat } from "@entities/chat/model/actions.ts";
import { API_URL_RESOURCES } from "@shared/config/urls.ts";
import {
  ChildGraph,
  ChildrenEdges,
  ChildrenNodes,
} from "@shared/lib/Component/model/children.types.ts";
import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams,
} from "@shared/lib/Component/model/types.ts";
import DOMService from "@shared/lib/DOM/DOMService.ts";
import FragmentService from "@shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "@shared/lib/helpers/factory/types.ts";
import { tinyDate } from "@shared/lib/helpers/formatting/date.ts";
import defaultAvatar from "../../../../static/avatar.png";
import { GoToChat } from "../ui/GoToChat.ts";
import css from "../ui/goToChat.module.css";
import { GoToChatConfigs, GoToChatProps } from "./types.ts";

export function getGoToChatGraph(apiChats: ChatResponse[]): ChildGraph {
  const goToChatNodes: ChildrenNodes = {};
  /* single edge for goToChat items-list {{{ goToChatItems }}} */
  const goToChatEdge: ChildrenEdges = {
    goToChatItems: [],
  };
  const goToChatItems = goToChatEdge.goToChatItems as ComponentId[];

  for (const chat of apiChats) {
    const { id, type, title, avatar, last_message } = chat;
    if (!type) {
      console.error("goToChat: chat type is not defined", chat, chat.type);
      continue;
    }

    const componentId = `goToChatItem_${id}`;

    const goToChatNode = getGoToChatNode(componentId, type, id, title, {
      avatar,
      contentText: last_message?.content,
      date: last_message?.time,
      unreadCount: chat.unread_count,
      on: {
        click: () => handleSelectChat(id),
      },
    });

    /* populating */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goToChatNodes[componentId] = goToChatNode as any;
    goToChatItems.push(componentId);
  }

  return { nodes: goToChatNodes, edges: goToChatEdge };
}

const getGoToChatNode = (
  id: ComponentId,
  type: ChatType,
  chatId: number,
  userName: string,
  {
    avatar,
    contentText,
    date,
    unreadCount,
    on,
  }: {
    avatar: string | null;
    contentText?: string;
    date?: ISODateString;
    unreadCount?: number;
    on?: GoToChatProps["on"];
  },
): ComponentNode<GoToChatProps, GoToChat> => {
  const params = getGoToChatParams(
    id,
    type,
    chatId,
    userName,
    avatar,
    contentText,
    date,
    unreadCount,
    on,
  );

  return {
    params,
    factory: buildGoToChat,
    runtime: {
      instance: buildGoToChat(params),
    },
  };
};

const getGoToChatParams = (
  id: ComponentId,
  type: ChatType,
  chatId: number,
  userName: string,
  avatar: string | null,
  contentText: string = "",
  date?: ISODateString,
  unreadCount: number = 0,
  on?: GoToChatProps["on"],
): ComponentParams<GoToChatProps> => {
  const configs: GoToChatConfigs = {
    id,
    rootTag: "li",
    type,
    classNames: css.goToChat,
    chatId,
    userName,
    avatar: avatar ? `${API_URL_RESOURCES}${avatar}` : defaultAvatar,
    contentText,
    date: tinyDate(date ?? ""),
    unreadCount,
  };

  return {
    configs,
    on,
  };
};

const buildGoToChat: ComponentFactory<GoToChatProps, GoToChat> = (
  params: ComponentParams<GoToChatProps>,
): GoToChat => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<GoToChatProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };
  const node: ComponentNode<GoToChatProps, GoToChat> = {
    params,
    factory: buildGoToChat,
  };

  return new GoToChat({ deps, node });
};
