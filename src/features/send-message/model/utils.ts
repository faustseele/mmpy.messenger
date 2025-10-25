import { ComponentDeps, ComponentNode, ComponentParams } from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { MessageField } from "../ui/MessageField.ts";
import { MessageFieldConfigs, MessageFieldProps } from "./types.ts";

export const createMessageField: ComponentFactory<MessageFieldProps, MessageField> = (
  params: ComponentParams<MessageFieldProps>
): MessageField => {
  const deps: ComponentDeps<MessageFieldProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessageFieldProps, MessageField> = {
    params,
    factory: createMessageField,
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
      className: "form",
    },
  };
};
