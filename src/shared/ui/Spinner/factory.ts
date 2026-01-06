import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "@/shared/lib/Component/model/types.ts";
import DOMService from "@/shared/lib/DOM/DOMService.ts";
import FragmentService from "@/shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "@/shared/lib/helpers/factory/types.ts";
import css from "./spinner.module.css";
import { Spinner } from "./Spinner.ts";
import { SpinnerProps } from "./types.ts";

export const getSpinnerNode = (
  isBig: boolean = false,
): ComponentNode<SpinnerProps> => {
  const params: ComponentParams<SpinnerProps> = {
    configs: {
      id: "spinner",
      tagName: "span",
      classNames: `${css.spinner} ${isBig ? css.spinner_big : ""}`.trim(),
      isBig,
    },
  };
  return {
    params,
    factory: buildSpinner,
    runtime: {
      instance: buildSpinner(params),
    },
  };
};

const buildSpinner: ComponentFactory<SpinnerProps, Spinner> = (
  params: ComponentParams<SpinnerProps>,
): Spinner => {
  const { id, tagName, classNames } = params.configs;

  const deps: ComponentDeps<SpinnerProps> = {
    domService: new DOMService(id, tagName, classNames),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildSpinner,
  };

  return new Spinner({ deps, node });
};
