import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { Page } from "../../page/ui/Page.ts";
import { ErrorMap, ErrorProps, ErrorSchema } from "../model/types.ts";
import css from "./errors.module.css";

export class ErrorPage extends Page<ErrorProps, ErrorMap, ErrorSchema> {
  constructor(props: ComponentProps<ErrorProps, ErrorMap, ErrorSchema>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!this.childrenInstances) {
      throw new Error("childrenInstances is not defined");
    }

    const backBtn = this.childrenInstances.singles.button_back;

    const link = backBtn.configs.link ?? RouteLink.Chats;

    backBtn.setProps({
      events: {
        click: () => Router.go(link),
      },
    });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <header class="${css.errorsHeadings}">
        {{{ heading }}}
        {{{ subheading }}}
      </header>
      
      <main>
        {{{ button_back }}}
      </main>
    `;
  }
}

export const createErrorPage: PageFactory<
  ErrorProps,
  ErrorPage,
  ErrorMap,
  ErrorSchema
> = (data: ComponentData<ErrorProps, ErrorMap, ErrorSchema>): ErrorPage => {
  if (!data.childrenSchema) {
    throw new Error("ErrorPage: ChildrenData are not defined");
  }

  const childrenInstances = buildChildren<ErrorMap, ErrorSchema>(
    data.childrenSchema,
  );

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new ErrorPage({ deps, data: { ...data, childrenInstances } });
};
