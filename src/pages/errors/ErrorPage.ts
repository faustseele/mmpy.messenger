import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { IComponentData } from "../../framework/Component/Component.d";
import Component, {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import { ErrorPageProps } from "./errors.d";
import css from "./errors.module.css";

export class ErrorPage extends Component<ErrorPageProps> {
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

export const createErrorPage: IComponentFactory<ErrorPageProps> = (
  data: IComponentData<ErrorPageProps>,
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
