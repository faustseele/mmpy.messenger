import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import css from "./heading.module.css";
import { Heading } from "./Heading.ts";
import { HeadingConfigs, HeadingOn, HeadingProps } from "./types.ts";

export const getHeadingNode = (
  configs: Omit<HeadingConfigs, "rootTag" | "classNames">,
  on?: HeadingOn,
): ComponentNode<HeadingProps, Heading> => {
  const params = getHeadingProps(
    {
      rootTag: "h1",
      classNames: css.heading,
      ...configs,
    },
    on,
  );

  return {
    params,
    factory: buildHeading,
    runtime: {
      instance: buildHeading(params),
    },
  };
};

const getHeadingProps = (
  configs: HeadingConfigs,
  on?: HeadingOn,
): ComponentParams<HeadingProps> => {
  return {
    configs,
    on: {
      ...on,
    },
  };
};

const buildHeading: ComponentFactory<HeadingProps, Heading> = (
  params: ComponentParams<HeadingProps>,
): Heading => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<HeadingProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };
  const node = {
    params,
    factory: buildHeading,
  };

  return new Heading({ deps, node });
};
