import {
  ComponentDeps,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { cx } from "../../lib/helpers/formatting/classnames.ts";
import css from "./heading.module.css";
import { Heading } from "./Heading.ts";
import { HeadingConfigs, HeadingProps } from "./types.ts";

export const buildHeading: ComponentFactory<HeadingProps, Heading> = (
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

export const getHeadingProps = (
  configs: Omit<HeadingConfigs, "tagName">,
): ComponentParams<HeadingProps> => {
  return {
    configs: {
      tagName: "h1",
      ...configs,
    },
    attributes: {
      className: cx(
        `${css.heading} ${configs.isClickable ? css.heading__text_clickable : ""} ${configs.isDrama ? css.heading__text_drama : ""}`,
      ),
    },
  };
};
