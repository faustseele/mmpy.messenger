/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { RouteLink } from "../../types/universal.ts";
import { getSpinnerNode } from "../Spinner/factory.ts";
import { Button } from "./Button.ts";
import { ButtonProps } from "./types.ts";
import css from "./button.module.css";

export const getButtonNode = ({
  id,
  label,
  type,
  link,
  isSilent,
  tooltip,
}: {
  id: ComponentId;
  label: string;
  type?: "button" | "submit";
  link?: RouteLink;
  isSilent?: boolean;
  tooltip?: string;
}): ComponentNode<ButtonProps> => {
  const params = getButtonProps({ id, label, type, link, isSilent, tooltip });
  return {
    params,
    factory: buildButton,
    runtime: {
      instance: buildButton(params),
    },
  };
};

const getButtonProps = ({
  id,
  label,
  type = "button",
  link,
  isSilent = false,
  tooltip = "",
}: {
  id: ComponentId;
  label: string;
  type?: "button" | "submit";
  link?: RouteLink;
  isSilent?: boolean;
  tooltip?: string;
}): ComponentParams<ButtonProps> => {
  return {
    configs: {
      id,
      rootTag: "button",
      label,
      isSilent,
      link,
      type,
      classNames: css.button,
      title: tooltip,
    },
    children: {
      nodes: {
        spinner: getSpinnerNode() as any,
      },
      edges: {
        spinner: "spinner",
      },
    },
  };
};

const buildButton: ComponentFactory<ButtonProps, Button> = (
  params: ComponentParams<ButtonProps>,
): Button => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<ButtonProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildButton,
  };

  return new Button({ deps, node });
};
