import { ComponentChildren } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { createButton, createHeading, createInput } from "../../utils/componentFactory.ts";
import cssPages from "../pages.module.css";
import css from "./auth.module.css";
import { signInData, signUpData } from "./data.ts";

// Props to determine if it's a sign-in or sign-up page
interface AuthPageProps {
  configs: {
    isSignUp: boolean;
  };
}

export class AuthPage extends Component {
  constructor(props: AuthPageProps) {
    const pageData = props.configs.isSignUp ? signUpData : signInData;

    const children: ComponentChildren = {
      __buttons: pageData.buttonData.map((buttonProps) =>
        createButton({ configs: buttonProps }),
      ),
      __heading: [createHeading({ configs: pageData.headingData[0] })],
      __inputs: pageData.inputData.map((inputProps) =>
        createInput({ configs: inputProps }),
      ),
    };

    console.log(children);

    const domService = new DOMService("div", {
      class: cssPages.moduleWindow,
    });
    const templateService = new FragmentService();

    super({ configs: props.configs }, children, domService, templateService);
  }

  public getSourceMarkup(): string {
    const footerModifier = this.configs.isSignUp ? css.authFooter_signUp : "";

    /* FragmentService will replace these with the actual component elements. */
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
