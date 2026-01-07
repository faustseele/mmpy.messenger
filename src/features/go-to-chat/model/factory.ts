import { handleSelectChat } from "@entities/chat/model/actions.ts";
import Store from "@app/providers/store/model/Store.ts";
import { ChatResponse } from "@/shared/api/model/api.types.ts";
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
import { cx } from "@shared/lib/helpers/formatting/classnames.ts";
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

  apiChats.forEach((apiChat) => {
    const id = `goToChatItem_${apiChat.id}`;
    const isNotes = Store.getState().isNotes[apiChat.id];

    const avatar = apiChat.avatar ?? "";
    const lastMsg = apiChat.last_message;
    const contentText = lastMsg?.content ?? "";
    const date = lastMsg?.time ?? "";
    const unreadCount = apiChat.unread_count;

    const goToChatNode = getGoToChatNode(
      {
        id,
        avatar,
        userName: apiChat.title,
        contentText,
        date,
        unreadCount,
        chatId: apiChat.id,
        isNotes,
      },
      {
        click: () => {
          handleSelectChat(apiChat.id);
        },
      },
    );

    /* populating */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goToChatNodes[id] = goToChatNode as any;
    goToChatItems.push(id);
  });

  return { nodes: goToChatNodes, edges: goToChatEdge };
}

const getGoToChatNode = (
  configs: Omit<GoToChatConfigs, "tagName" | "classNames">,
  on?: GoToChatProps["on"],
): ComponentNode<GoToChatProps, GoToChat> => {
  const params = getGoToChatParams(configs, on);
  return {
    params,
    factory: buildGoToChat,
    runtime: {
      instance: buildGoToChat(params),
    },
  };
};

const getGoToChatParams = (
  configs: Omit<GoToChatConfigs, "tagName" | "classNames">,
  on?: GoToChatProps["on"],
): ComponentParams<GoToChatProps> => {
  const avatar = configs.avatar
    ? `${API_URL_RESOURCES}${configs.avatar}`
    : defaultAvatar;

  return {
    configs: {
      tagName: "li",
      classNames: cx(
        `${css.goToChat} ${configs.isNotes ? css.goToChat_note : ""}`,
      ).trim(),
      tabIndex: "0",
      ...configs,
      avatar,
      date: tinyDate(configs.date),
    },
    on: {
      ...on,
    },
  };
};

const buildGoToChat: ComponentFactory<GoToChatProps, GoToChat> = (
  params: ComponentParams<GoToChatProps>,
): GoToChat => {
  const { id, tagName, classNames } = params.configs;

  const deps: ComponentDeps<GoToChatProps> = {
    domService: new DOMService(id, tagName, classNames),
    fragmentService: new FragmentService(),
  };
  const node: ComponentNode<GoToChatProps, GoToChat> = {
    params,
    factory: buildGoToChat,
  };

  return new GoToChat({ deps, node });
};
