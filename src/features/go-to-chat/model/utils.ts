import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { GoToChat } from "../ui/GoToChat.ts";
import css from "../ui/goToChat.module.css";
import { GoToChatConfigs, GoToChatProps } from "./types.ts";

export const getGoToChatParams = (
  configs: Omit<GoToChatConfigs, "tagName">,
): ComponentParams<GoToChatProps> => {
  return {
    configs: {
      tagName: "li",
      ...configs,
    },
    attributes: {
      className: css.catalogueItem,
    },
  };
};

export const createGoToChat: ComponentFactory<GoToChatProps, GoToChat> = (
  params: ComponentParams<GoToChatProps>,
): GoToChat => {
  const deps: ComponentDeps<GoToChatProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };
  const node: ComponentNode<GoToChatProps, GoToChat> = {
    params,
    factory: createGoToChat,
  };

  return new GoToChat({ deps, node });
};
