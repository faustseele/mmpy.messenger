import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
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
  constructor(props: ErrorPageProps) {

    const children = {
      heading: props.configs.headingData.map((headingProps) =>
        createHeading({ configs: headingProps }),
      ),
      subheading: props.configs.subheadingData.map((subheadingProps) =>
        createSubheading({ configs: subheadingProps }),
      ),
      button: props.configs.buttonData.map((buttonProps) =>
        createButton({ configs: buttonProps }),
      ),
    };

    const domService = new DOMService("div", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_errors}`,
    });
    const templateService = new FragmentService();

    super({ configs: props.configs }, children, domService, templateService);
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
