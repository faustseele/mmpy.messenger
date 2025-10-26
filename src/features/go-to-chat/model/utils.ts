import defaultAvatar from "../../../../static/avatar.png";
import { API_URL_RESOURCES } from "../../../shared/config/urls.ts";
import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { tinyDate } from "../../../shared/lib/helpers/formatting/date.ts";
import { GoToChat } from "../ui/GoToChat.ts";
import css from "../ui/goToChat.module.css";
import { GoToChatConfigs, GoToChatProps } from "./types.ts";

export const getGoToChatNodeWithInstance = (
  configs: Omit<GoToChatConfigs, "tagName">,
  on?: GoToChatProps["on"],
) => {
  const node = getGoToChatNode(configs, on);
  return {
    ...node,
    runtime: {
      instance: buildGoToChat(node.params),
    },
  };
};

export const getGoToChatNode = (
  configs: Omit<GoToChatConfigs, "tagName">,
  on?: GoToChatProps["on"],
) => {
  return {
    params: getGoToChatParams(configs, on),
    factory: buildGoToChat,
  };
};

export const getGoToChatParams = (
  configs: Omit<GoToChatConfigs, "tagName">,
  on?: GoToChatProps["on"],
): ComponentParams<GoToChatProps> => {
  const avatar = configs.avatar
    ? `${API_URL_RESOURCES}${configs.avatar}`
    : defaultAvatar;

  const date = tinyDate(configs.date);

  return {
    configs: {
      tagName: "li",
      ...configs,
      avatar: avatar,
      date: date,
    },
    attributes: {
      className: css.goToChat,
    },
    on: {
      ...on,
    },
  };
};

export const buildGoToChat: ComponentFactory<GoToChatProps, GoToChat> = (
  params: ComponentParams<GoToChatProps>,
): GoToChat => {
  const deps: ComponentDeps<GoToChatProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };
  const node: ComponentNode<GoToChatProps, GoToChat> = {
    params,
    factory: buildGoToChat,
  };

  return new GoToChat({ deps, node });
};
