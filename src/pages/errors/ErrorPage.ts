import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import Router from "../../core/Router/Router.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import {
  createButton,
  createHeading,
  createSubheading,
} from "../../utils/componentFactory.ts";
import pagesCss from "../pages.module.css";
import { IErrorPageData } from "./errors.d";
import css from "./errors.module.css";

export interface ErrorPageProps extends ComponentProps {
  configs: IErrorPageData;
}

export class ErrorPage extends Component {
  constructor(props: ErrorPageProps, router: Router) {
    const domService = new DOMService("div", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_errors}`,
    });
    const templateService = new FragmentService();

    const { configs } = props;

    const children = {
      heading: createHeading({ configs: configs.headingData }),
      subheading: createSubheading({ configs: configs.subheadingData }),
      button: createButton({ configs: configs.buttonData }),
    };

    super({ configs: props.configs }, children, domService, templateService);

    children.button.setProps({
      events: {
        click: (e: Event) => router.routeTo(configs.buttonData.__link!, e),
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
