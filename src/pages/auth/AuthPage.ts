import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import Router from "../../core/Router/Router.ts";
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
  public componentName = "AuthPage";

  constructor(router: Router, props: AuthPageProps) {
    const domService = new DOMService("form", {
      class: cssPages.moduleWindow,
    });
    const fragmentService = new FragmentService();

    const { configs } = props;
    const children = createChildren(configs);

    const formController = new FormController(router, children.__inputs);

    const buttonReroute = children.__buttonReroute[0];

    buttonReroute.setProps({
      ...buttonReroute,
      events: {
        click: (e: Event) =>
          router.routeTo(configs.buttonData_reroute.configs.__link!, e),
      },
    });

    super(
      {
        configs,
        events: {
          /* Handling <form> onSubmit.
            Submit-button's event-listener is attached
            automatically through <form> 'submit' listener */
          submit: formController.onSubmit,
        },
      },
      children,
      domService,
      fragmentService,
    );
  }

  public getSourceMarkup(): string {
    const footerModifier = this.configs.isSignUp ? css.authFooter_signUp : "";

    // The root of the template must be the <form> for the 'submit' event to fire.
    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ __heading }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.inputsWrapper}">
            {{{ __inputs }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${footerModifier}">
          {{{ __buttonReroute }}}
          {{{ __buttonSubmit }}}
        </footer>
    `;
  }
}
