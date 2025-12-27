import Store from "@app/providers/store/model/Store.ts";
import { ChildGraph, ChildrenEdges, ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
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
  configs: Omit<MessageConfigs, "tagName">,
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
  configs: Omit<MessageConfigs, "tagName">,
): ComponentParams<MessageProps> => {
  return {
    configs: {
      tagName: "article",
      ...configs,
    },
    attributes: {
      className: css.message,
    },
  };
};

const buildMessage: ComponentFactory<MessageProps, MessageBubble> = (
  params: ComponentParams<MessageProps>,
): MessageBubble => {
  const messageClasses = [
    css.message,
    params.configs.type === "outgoing" ? css.message_outgoing : "",
    params.configs.type === "incoming" ? css.message_incoming : "",
    params.configs.type === "date" ? css.message_dateBubble : "",
  ]
    /* cleans up the array of falsy elements */
    .filter(Boolean)
    .join(" ");

  const attributes = {
    ...params.attributes,
    className: `${params.attributes?.className || ""} ${messageClasses}`.trim(),
  };

  const deps: ComponentDeps<MessageProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessageProps, MessageBubble> = {
    params,
    factory: buildMessage,
  };

  return new MessageBubble({ deps, node });
};
