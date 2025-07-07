import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import cssPages from "../pages.module.css";
import { IAuthPageData } from "./auth.d";
import css from "./auth.module.css";
import { FormController } from "./FormController.ts";
import { createChildren } from "./utils.ts";

export interface AuthPageProps extends ComponentProps {
  configs: IAuthPageData;
}

export class AuthPage extends Component {
  constructor(props: AuthPageProps) {
    const { configs } = props;

    const children = createChildren(configs);

    const formController = new FormController(children.__inputs);

    const domService = new DOMService("form", {
      class: cssPages.moduleWindow,
    });

    const fragmentService = new FragmentService();

    /* Handling form onSubmit & onBlur */
    super(
      {
        configs,
        events: {
          submit: formController.handleSubmit,
        },
      },
      children,
      domService,
      fragmentService,
    );

    children.__buttonSignUp[0].setProps({
      configs: children.__buttonSignUp[0].configs,
      events: {
        click: formController.handleSubmit,
      },
    });
  }

  public getSourceMarkup(): string {
    const footerModifier = this.configs.isSignUp ? css.authFooter_signUp : "";

    // The root of the template must be the <form> for the 'submit' event to fire.
    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ __heading }}}
        </header>

        <main class="${css.authContent}">
          {{{ __inputs }}}
        </main>

        <footer class="${css.authFooter} ${footerModifier}">
          {{{ __buttonSignIn }}}
          {{{ __buttonSignUp }}}
        </footer>
    `;
  }
}
