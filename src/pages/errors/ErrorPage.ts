import { ComponentParams } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import Router from "../../core/Router/Router.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import {
  createButton,
  createHeading,
  createSubheading,
} from "../../utils/factory/factory.ts";
import pagesCss from "../pages.module.css";
import { IErrorPageConfigs } from "./errors.d";
import css from "./errors.module.css";

export interface ErrorPageProps extends ComponentParams {
  configs: IErrorPageConfigs;
}

export class ErrorPage extends Component {
  constructor(props: ErrorPageProps) {
    const domService = new DOMService("div", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_errors}`,
    });
    const templateService = new FragmentService();

    const { configs } = props;

    const children = {
      heading: createHeading({ configs: configs.headingConfigs }),
      subheading: createSubheading({ configs: configs.subheadingConfigs }),
      button: createButton({ configs: configs.buttonConfigs }),
    };

    super({ configs: props.configs }, children, domService, templateService);

    children.button.setProps({
      events: {
        click: () => Router.go(configs.buttonConfigs.__link!),
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
        {{{ button }}}
      </main>
    `;
  }
}
