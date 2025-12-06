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

export const getMessageFieldNode = (
  id: ComponentId
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
      type: "text",
      label: "Message Input",
      placeholder: ChatService.isCurrentChatNotes() ? "Заметка:" : "Cообщение...",
    },
    attributes: {
      className: css.messageField,
    },
  };
};

const buildMessageField: ComponentFactory<
  MessageFieldProps,
  MessageField
> = (params: ComponentParams<MessageFieldProps>): MessageField => {
  const deps: ComponentDeps<MessageFieldProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessageFieldProps, MessageField> = {
    params,
    factory: buildMessageField,
  };

  return new MessageField({ deps, node });
};
