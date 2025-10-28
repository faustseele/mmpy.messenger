import { AppState } from "../../../app/providers/store/Store.ts";
import {
  ComponentDeps,
  ComponentParams,
  ComponentPatch,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { PageNode } from "../../page/model/types.ts";
import { AuthPage } from "../ui/AuthPage.ts";
import { AuthProps } from "./types.ts";

export const buildAuthPage: PageFactory<AuthProps, AuthPage> = (
  params: ComponentParams<AuthProps>,
): AuthPage => {
  const deps: ComponentDeps<AuthProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };

  const node: PageNode<AuthProps, AuthPage> = {
    params,
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
