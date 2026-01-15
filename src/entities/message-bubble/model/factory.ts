import Store from "@app/providers/store/model/Store.ts";
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
import { hhmmDate } from "@shared/lib/helpers/formatting/date.ts";
import css from "../ui/messageBubble.module.css";
import { MessageBubble } from "../ui/MessageBubble.ts";
import { MessageConfigs, MessageProps } from "./types.ts";

export function getMessagesGraph(): ChildGraph {
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

    const messageNode = getMessageNode({
      id,
      text: msg.content,
      type,
      date,
    });

    /* populating */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messageNodes[id] = messageNode as any;
    messages.push(id);
  });

  return { nodes: messageNodes, edges: messageEdge };
}

export const getMessageNode = (
  configs: Omit<MessageConfigs, "rootTag" | "classNames">,
): ComponentNode<MessageProps, MessageBubble> => {
  const params = getMessageParams(configs);
  return {
    params,
    factory: buildMessage,
    runtime: {
      instance: buildMessage(params),
    },
  };
};

const getMessageParams = (
  configs: Omit<MessageConfigs, "rootTag" | "classNames">,
): ComponentParams<MessageProps> => {
  return {
    configs: {
      rootTag: "article",
      classNames: css.message,
      ...configs,
    },
  };
};

const buildMessage: ComponentFactory<MessageProps, MessageBubble> = (
  params: ComponentParams<MessageProps>,
): MessageBubble => {
  const { id, rootTag } = params.configs;
  const deps: ComponentDeps<MessageProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessageProps, MessageBubble> = {
    params,
    factory: buildMessage,
  };

  return new MessageBubble({ deps, node });
};
