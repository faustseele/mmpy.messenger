import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import css from "../ui/messageBubble.module.css";
import { MessageBubble } from "../ui/MessageBubble.ts";
import { MessageConfigs, MessageProps } from "./types.ts";

export const getMessageParams = (
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

export const createMessage: ComponentFactory<MessageProps, MessageBubble> = (
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
    domService: new DOMService(params.configs.id, params.configs.tagName, attributes),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessageProps, MessageBubble> = {
    params,
    factory: createMessage,
  };

  return new MessageBubble({ deps, node });
};
