import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { cx } from "../../lib/helpers/formatting/classnames.ts";
import css from "./heading.module.css";
import { Heading } from "./Heading.ts";
import { HeadingConfigs, HeadingOn, HeadingProps } from "./types.ts";

export const getHeadingNode = (
  configs: Omit<HeadingConfigs, "tagName">,
  on?: HeadingOn
): ComponentNode<HeadingProps, Heading> => {
  const params = getHeadingProps(configs, on);
  return {
    params,
    factory: buildHeading,
    runtime: {
      instance: buildHeading(params),
    },
  };
};

const getHeadingProps = (
  configs: Omit<HeadingConfigs, "tagName">,
  on?: HeadingOn,
): ComponentParams<HeadingProps> => {
  return {
    configs: {
      tagName: "h1",
      ...configs,
    },
    attributes: {
      className: cx(
        `${css.heading}`,
      ),
    },
    on: {
      ...on,
    }
  };
};

const buildHeading: ComponentFactory<HeadingProps, Heading> = (
  params: ComponentParams<HeadingProps>,
): Heading => {
  const deps: ComponentDeps<HeadingProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };
  const node = {
    params,
    factory: buildHeading,
  };

  return new Heading({ deps, node });
};
