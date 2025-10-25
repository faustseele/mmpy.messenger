import {
  ComponentDeps,
  ComponentParams,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { ErrorPage } from "../ui/ErrorPage.ts";
import { ErrorProps } from "./types.ts";

export const buildErrorPage: PageFactory<ErrorProps, ErrorPage> = (
  params: ComponentParams<ErrorProps>,
): ErrorPage => {
  if (!params.children) {
    throw new Error("ErrorPage: children are not defined");
  }

  const deps: ComponentDeps<ErrorProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };

  const node = {
    params: {
      ...params,
      children: buildChildren(params.children),
    },
    factory: buildErrorPage,
  };

  return new ErrorPage({
    deps,
    node,
  });
};
