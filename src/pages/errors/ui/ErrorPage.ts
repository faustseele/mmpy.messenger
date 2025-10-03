import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import {
  getChildFromMap,
  getChildSlotKey,
} from "../../../shared/lib/Component/lib/utils.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { createChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { Page } from "../../page/ui/Page.ts";
import { ErrorPageProps } from "../model/types.ts";
import css from "./errors.module.css";

export class ErrorPage extends Page<ErrorPageProps> {
  constructor(props: ComponentProps<ErrorPageProps>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const button = getChildFromMap(this.children!, "button");

    const link = button.configs.link ?? RouteLink.Chats;

    button.setProps({
      events: {
        click: () => Router.go(link),
      },
    });
  }

  public getSourceMarkup(): string {
    const headingKey = getChildSlotKey(this.childrenData!, "heading");
    const subheadingKey = getChildSlotKey(this.childrenData!, "subheading");
    const buttonKey = getChildSlotKey(this.childrenData!, "button");

    return /*html*/ `
      <header class="${css.errorsHeadings}">
        {{{ ${headingKey} }}}
        {{{ ${subheadingKey} }}}
      </header>
      
      <main>
        {{{ ${buttonKey} }}}
      </main>
    `;
  }
}

export const createErrorPage: PageFactory<ErrorPageProps> = (
  data: ComponentData<ErrorPageProps>,
): ErrorPage => {
  if (!data.childrenData) {
    throw new Error("ErrorPage: ChildrenData are not defined");
  }

  const children = createChildren(data.childrenData);
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  const preparedData = { ...data, children };
  return new ErrorPage({ deps, data: preparedData });
};
