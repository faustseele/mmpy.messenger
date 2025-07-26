import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { ComponentProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import cssPages from "../pages.module.css";
import { IAuthPageConfigs } from "./auth.d";
import css from "./auth.module.css";
import { FormController } from "./FormController.ts";
import { createChildren } from "./utils.ts";

export interface AuthPageProps extends ComponentProps {
  configs: IAuthPageConfigs;
}

export class AuthPage extends Component {
  public componentName = "AuthPage";

  constructor(props: AuthPageProps) {
    const domService = new DOMService("form", {
      class: cssPages.moduleWindow,
    });
    const fragmentService = new FragmentService();

    const { configs } = props;

    const children = createChildren(configs);

    const formController = new FormController(children.inputs);

    super(
      {
        configs,
        events: {
          /* Handling <form> onFormSubmit.
            Submit-button's event-listener is attached
            automatically through <form> 'submit' listener */
          submit: (e: Event) =>
            formController.onFormSubmit(e, RouteLink.Chats),
        },
      },
      children,
      domService,
      fragmentService,
    );

    const buttonReroute = children.buttonReroute;
    const inputs = children.inputs;

    /* Setting event for the auth-reroute button */
    buttonReroute.setProps({
      events: {
        click: () =>
          Router.go(
            configs.buttonProps_reroute.configs.__link ?? RouteLink.NotFound,
          ),
      },
    });

    /* Setting blur-events for the input fields */
    inputs.forEach((input) => {
      input.setProps({
        events: {
          focusout: () => formController.onInputBlur(input),
        },
      });
    });
  }

  public getSourceMarkup(): string {
    const footerModifier = this.configs.isSignUp ? css.authFooter_signUp : "";

    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ heading }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.inputsWrapper}">
            {{{ inputs }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${footerModifier}">
          {{{ buttonReroute }}}
          {{{ buttonFormSubmit }}}
        </footer>
    `;
  }
}
