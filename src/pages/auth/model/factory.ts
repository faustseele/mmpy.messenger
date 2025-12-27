import { connect } from "@app/providers/store/model/connect.ts";
import {
  ComponentDeps,
  ComponentParams
} from "@shared/lib/Component/model/types.ts";
import DOMService from "@shared/lib/DOM/DOMService.ts";
import FragmentService from "@shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "@shared/lib/helpers/factory/types.ts";
import { PageNode } from "@pages/page/model/types.ts";
import { authPageNode_in, authPageNode_up } from "../config/params.ts";
import { AuthPage } from "../ui/AuthPage.ts";
import { mapAuthState } from "./map.ts";
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

export const createAuthPage_signIn = () =>
  connect(authPageNode_in, mapAuthState);
export const createAuthPage_signUp = () =>
  connect(authPageNode_up, mapAuthState);
