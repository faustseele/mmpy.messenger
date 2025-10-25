import { AppState } from "../../../app/providers/store/Store.ts";
import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
  ComponentPatch,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { MessengerPage } from "../ui/MessengerPage.ts";
import { MessengerProps } from "./types.ts";

export const buildMessengerPage: PageFactory<MessengerProps, MessengerPage> = (
  params: ComponentParams<MessengerProps>,
): MessengerPage => {
  if (!params.children) {
    throw new Error("MessengerPage: children is not defined");
  }

  const deps: ComponentDeps<MessengerProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessengerProps, MessengerPage> = {
    params: {
      ...params,
      children: buildChildren(params.children),
    },
    factory: buildMessengerPage,
  };

  return new MessengerPage({
    deps,
    node,
  });
};

export const mapMessengerState = (
  _state: AppState,
): ComponentPatch<MessengerProps> => ({
  configs: {},
});
