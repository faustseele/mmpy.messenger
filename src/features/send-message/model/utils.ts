import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import css from "../ui/messageField.module.css";
import { MessageField } from "../ui/MessageField.ts";
import { MessageFieldConfigs, MessageFieldProps } from "./types.ts";

export const getMessageFieldNode = (
  configs: Omit<MessageFieldConfigs, "tagName" | "type">,
): ComponentNode<MessageFieldProps, MessageField> => {
  const params = getMessageFieldParams(configs);
  return {
    params,
    factory: buildMessageField,
    runtime: {
      instance: buildMessageField(params),
    },
  };
};

export const buildMessageField: ComponentFactory<
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

export const getMessageFieldParams = (
  configs: Omit<MessageFieldConfigs, "tagName" | "type">,
): ComponentParams<MessageFieldProps> => {
  return {
    configs: {
      tagName: "form",
      type: "text",
      ...configs,
    },
    attributes: {
      className: css.messageField,
    },
  };
};
