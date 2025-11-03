import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import cssSubheading from "./subheading.module.css";
import { Subheading } from "./Subheading.ts";
import { SubheadingProps } from "./types.ts";

export const getSubheadingNode = ({
  id,
  text,
  isDrama = false,
}: {
  id: string;
  text: string;
  isDrama?: boolean;
}): ComponentNode<SubheadingProps> => {
  const params = getSubheadingProps({ id, text, isDrama });
  return {
    params,
    factory: buildSubheading,
    runtime: {
      instance: buildSubheading(params),
    },
  };
};

const getSubheadingProps = ({
  id,
  text,
  isDrama = false,
}: {
  id: string;
  text: string;
  isDrama?: boolean;
}): ComponentParams<SubheadingProps> => {
  return {
    configs: {
      id,
      tagName: "h2",
      text,
    },
    attributes: {
      className:
        `${cssSubheading.subheading} ${isDrama ? cssSubheading.subheading_drama : ""}`.trim(),
    },
  };
};

const buildSubheading: ComponentFactory<SubheadingProps, Subheading> = (
  params: ComponentParams<SubheadingProps>,
): Subheading => {
  const deps: ComponentDeps<SubheadingProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildSubheading,
  };

  return new Subheading({ deps, node });
};
