import ChatService from "@entities/chat/model/ChatService.ts";
import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams,
} from "@shared/lib/Component/model/types.ts";
import DOMService from "@shared/lib/DOM/DOMService.ts";
import FragmentService from "@shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "@shared/lib/helpers/factory/types.ts";
import css from "../ui/messageField.module.css";
import { MessageField } from "../ui/MessageField.ts";
import { MessageFieldProps } from "./types.ts";
import { handleSendMessage } from "./actions.ts";

export const getMessageFieldNode = (
  id: ComponentId,
): ComponentNode<MessageFieldProps, MessageField> => {
  const params = getMessageFieldParams(id);
  return {
    params,
    factory: buildMessageField,
    runtime: {
      instance: buildMessageField(params),
    },
  };
};

const getMessageFieldParams = (
  id: ComponentId,
): ComponentParams<MessageFieldProps> => {
  return {
    configs: {
      id,
      tagName: "form",
      classNames: css.messageField,
      type: "text",
      label: "Message Input",
      placeholder: ChatService.isCurrentChatNotes()
        ? "Заметка:"
        : "Cообщение...",
    },
    on: {
      sendMessage: handleSendMessage,
    },
  };
};

const buildMessageField: ComponentFactory<MessageFieldProps, MessageField> = (
  params: ComponentParams<MessageFieldProps>,
): MessageField => {
  const { id, tagName, classNames } = params.configs;

  const deps: ComponentDeps<MessageFieldProps> = {
    domService: new DOMService(id, tagName, classNames),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessageFieldProps, MessageField> = {
    params,
    factory: buildMessageField,
  };

  return new MessageField({ deps, node });
};
