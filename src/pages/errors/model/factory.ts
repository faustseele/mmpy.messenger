import {
  ComponentDeps,
  ComponentParams,
} from "@shared/lib/Component/model/types.ts";
import DOMService from "@shared/lib/DOM/DOMService.ts";
import FragmentService from "@shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "@shared/lib/helpers/factory/types.ts";
import { errorPageParams_404, errorPageParams_500 } from "../config/params.ts";
import { ErrorPage } from "../ui/ErrorPage.ts";
import { ErrorProps } from "./types.ts";

export const buildErrorPage: PageFactory<ErrorProps, ErrorPage> = (
  params: ComponentParams<ErrorProps>,
): ErrorPage => {
  const { id, tagName, classNames } = params.configs;
  const deps: ComponentDeps<ErrorProps> = {
    domService: new DOMService(id, tagName, classNames),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildErrorPage,
  };

  return new ErrorPage({
    deps,
    node,
  });
};

export const createErrorPage_404 = () => buildErrorPage(errorPageParams_404);
export const createErrorPage_500 = () => buildErrorPage(errorPageParams_500);
