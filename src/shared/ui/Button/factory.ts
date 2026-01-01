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
import css from "./button.module.css";
import { Button } from "./Button.ts";
import { ButtonProps } from "./types.ts";

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
}): ComponentParams<ButtonProps> => {
  return {
    configs: {
      id,
      tagName: "button",
      label,
      isSilent: isSilent ?? false,
      link,
    },
    attributes: {
      className: `${css.button} ${isSilent ? css.button_silent : ""}`.trim(),
      type: type ?? "button",
      title: tooltip ?? "",
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
  const deps: ComponentDeps<ButtonProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildButton,
  };

  return new Button({ deps, node });
};
