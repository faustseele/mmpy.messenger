import { AppState } from "../../../app/providers/store/Store.ts";
import {
  ComponentDeps,
  ComponentParams,
  ComponentPatch,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { PageNode } from "../../page/model/types.ts";
import { AuthPage } from "../ui/AuthPage.ts";
import { AuthProps } from "./types.ts";

export const buildAuthPage: PageFactory<AuthProps, AuthPage> = (
  params: ComponentParams<AuthProps>,
): AuthPage => {
  if (!params.children) {
    throw new Error("childrenSchema is not defined");
  }

  const deps: ComponentDeps<AuthProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };

  const node: PageNode<AuthProps, AuthPage> = {
    params: {
      ...params,
      children: buildChildren(params.children),
    },
    factory: buildAuthPage,
  };

  return new AuthPage({
    deps,
    node,
  });
};

export const mapAuthState = (_state: AppState): ComponentPatch<AuthProps> => {
  return {};
};
