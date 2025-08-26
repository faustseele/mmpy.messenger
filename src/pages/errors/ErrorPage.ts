import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { ComponentData } from "../../framework/Component/component";
import {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { PageFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import { Page } from "../Page.ts";
import { ErrorPageProps } from "./errors.d";
import css from "./errors.module.css";

export class ErrorPage extends Page<ErrorPageProps> {
  constructor(props: ComponentParams<ErrorPageProps>) {
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
