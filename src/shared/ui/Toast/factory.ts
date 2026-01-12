import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "@/shared/lib/Component/model/types.ts";
import DOMService from "@/shared/lib/DOM/DOMService.ts";
import FragmentService from "@/shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "@/shared/lib/helpers/factory/types.ts";
import css from "./toast.module.css";
import { Toast } from "./Toast.ts";
import { ToastProps, ToastType } from "./types.ts";

export const getToastNode = ({
  message,
  type = "info",
  duration = 3000,
}: {
  message: string;
  type?: ToastType;
  duration?: number;
}): ComponentNode<ToastProps> => {
  const params: ComponentParams<ToastProps> = {
    configs: {
      id: "toast",
      tagName: "span",
      classNames:
        `${css.toast} ${type === "error" ? css.toast_error : ""}`.trim(),
      message,
      type,
      duration,
    },
  };
  return {
    params,
    factory: buildToast,
    runtime: {
      instance: buildToast(params),
    },
  };
};

const buildToast: ComponentFactory<ToastProps, Toast> = (
  params: ComponentParams<ToastProps>,
): Toast => {
  const { id, tagName, classNames } = params.configs;

  const deps: ComponentDeps<ToastProps> = {
    domService: new DOMService(id, tagName, classNames),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<ToastProps, Toast> = {
    params,
    factory: buildToast,
  };

  return new Toast({ deps, node });
};
