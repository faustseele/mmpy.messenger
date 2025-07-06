import {
  ComponentChildren,
  ComponentProps,
} from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import {
  createButton,
  createHeading,
  createInput,
} from "../../utils/componentFactory.ts";
import cssPages from "../pages.module.css";
import { IAuthPageData } from "./auth.d";
import css from "./auth.module.css";

export interface AuthPageProps extends ComponentProps {
  configs: IAuthPageData;
}

export class AuthPage extends Component {
  constructor(props: AuthPageProps) {
    const { configs } = props;
    const { headingData, inputData, buttonData } = configs;

    const children: ComponentChildren = {
      __buttons: buttonData.map((buttonProps) =>
        createButton({ configs: buttonProps }),
      ),
      __heading: [createHeading({ configs: headingData[0] })],
      __inputs: inputData.map((inputProps) =>
        createInput({ configs: inputProps }),
      ),
    };

    const domService = new DOMService("div", {
      class: cssPages.moduleWindow,
    });
    const fragmentService = new FragmentService();

    super(props, children, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    const footerModifier = this.configs.isSignUp ? css.authFooter_signUp : "";

    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ __heading }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.authContent__form}">
            {{{ __inputs }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${footerModifier}">
          {{{ __buttons }}}
        </footer>
      `;
  }
}
