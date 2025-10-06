import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Input } from "../../../shared/ui/Input/Input.ts";
import { Page } from "../../page/ui/Page.ts";
import { AuthMap, AuthProps, AuthSchema } from "../model/types.ts";
import css from "./auth.module.css";

export class AuthPage extends Page<AuthProps, AuthMap, AuthSchema> {
  private footerModifier: string = "";

  constructor(props: ComponentProps<AuthProps, AuthMap, AuthSchema>) {
    const { deps, data } = props;

    super({ deps, data });

    this.footerModifier =
      data.configs.type === "sign-up" ? css.authFooter_signUp : "";
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!this.childrenInstances) {
      throw new Error("childrenInstances is not defined");
    }

    const { inputs } = this.childrenInstances.lists;
    const { buttonReroute } = this.childrenInstances.singles;

    const formValidator = new FormValidator(inputs);

    this._setRerouteEvent(buttonReroute);
    this._setInputsEvents(inputs, formValidator);
    this._setSubmitEvent(formValidator);
  }

  private _setSubmitEvent(formValidator: FormValidator): void {
    this.setProps({
      events: {
        submit: (e: Event) =>
          formValidator.onFormSubmit(e, RouteLink.Messenger, this.configs.type),
      },
    });
  }

  /* Setting event for the auth-reroute button */
  private _setRerouteEvent(buttonReroute: Button): void {
    buttonReroute.setProps({
      events: {
        click: () =>
          Router.go(buttonReroute.configs.link ?? RouteLink.NotFound),
      },
    });
  }

  /* Setting blur-events for the input fields */
  private _setInputsEvents(
    inputs: Input[],
    formValidator: FormValidator,
  ): void {
    inputs.forEach((input) => {
      input.setProps({
        events: {
          focusout: () => formValidator.onInputBlur(input),
        },
      });
    });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ heading }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.inputsWrapper}">
            {{{ inputs }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${this.footerModifier}">
          {{{ buttonReroute }}}
          {{{ buttonFormSubmit }}}
        </footer>
    `;
  }
}

export const createAuthPage: PageFactory<
  AuthProps,
  AuthPage,
  AuthMap,
  AuthSchema
> = (data: ComponentData<AuthProps, AuthMap, AuthSchema>): AuthPage => {
  if (!data.childrenSchema) {
    throw new Error("childrenSchema is not defined");
  }

  const childrenInstances = buildChildren<AuthMap, AuthSchema>(data.childrenSchema);

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new AuthPage({
    deps,
    data: {
      ...data,
      childrenInstances,
    },
  });
};
