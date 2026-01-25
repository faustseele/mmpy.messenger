import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams,
} from "@/shared/lib/Component/model/types.ts";
import DOMService from "@/shared/lib/DOM/DOMService.ts";
import FragmentService from "@/shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "@/shared/lib/helpers/factory/types.ts";
import css from "./avatar.module.css";
import { Avatar } from "./Avatar.ts";
import { AvatarProps } from "./types.ts";
import defaultAvatar from "../../../../static/avatar.png";
import { API_URL_RESOURCES } from "@/shared/config/urls.ts";

export const getAvatarNode = (
  id: ComponentId,
  title: string | undefined = undefined,
  src: string | null | undefined = undefined,
  {
    hasInput = false,
    isBig = false,
  }: {
    hasInput?: boolean;
    isBig?: boolean;
  } = {},
): ComponentNode<AvatarProps> => {
  const params: ComponentParams<AvatarProps> = {
    configs: {
      id,
      rootTag: "div",
      classNames: css.avatarWrap,
      title: title ?? "",
      src: src ? `${API_URL_RESOURCES}/${src}` : defaultAvatar,
      noAvatar: !src,
      letter: (title ?? '?').charAt(0),
      isBig,
      hasInput,
    },
  };

  return {
    params,
    factory: buildAvatar,
    runtime: {
      instance: buildAvatar(params),
    },
  };
};

const buildAvatar: ComponentFactory<AvatarProps, Avatar> = (
  params: ComponentParams<AvatarProps>,
): Avatar => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<AvatarProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildAvatar,
  };

  return new Avatar({ deps, node });
};
