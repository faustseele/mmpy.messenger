import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "@/shared/lib/Component/model/types.ts";
import DOMService from "@/shared/lib/DOM/DOMService.ts";
import FragmentService from "@/shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "@/shared/lib/helpers/factory/types.ts";
import { Spinner } from "./Spinner.ts";
import { SpinnerProps } from "./types.ts";

export const getSpinnerNode = (): ComponentNode<SpinnerProps> => {
  return {
    params: {
      configs: {
        id: "spinner",
        tagName: "span",
      },
    },
    factory: buildSpinner,
    runtime: {
      instance: buildSpinner({
        configs: {
          id: "spinner",
          tagName: "span",
        },
      }),
    },
  };
};

const buildSpinner: ComponentFactory<SpinnerProps, Spinner> = (
  params: ComponentParams<SpinnerProps>,
): Spinner => {
  const deps: ComponentDeps<SpinnerProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildSpinner,
  };

  return new Spinner({ deps, node });
};
