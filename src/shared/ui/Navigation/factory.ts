import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import css from "./navigation.module.css";
import { Navigation } from "./Navigation.ts";
import { NavigationProps } from "./types.ts";

export const getNavigationNode = (
  id: ComponentId,
): ComponentNode<NavigationProps> => {
  const params = {
    configs: { id, rootTag: "nav", classNames: css.nav },
  } as const;
  return {
    params,
    factory: buildNavigation,
    runtime: {
      instance: buildNavigation(params),
    },
  };
};

const buildNavigation: ComponentFactory<NavigationProps, Navigation> = (
  params: ComponentParams<NavigationProps>,
): Navigation => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<NavigationProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildNavigation,
  };

  return new Navigation({ deps, node });
};
