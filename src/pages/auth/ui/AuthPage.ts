import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Input } from "../../../shared/ui/Input/Input.ts";
import { Page } from "../../page/ui/Page.ts";
import { AuthMap, AuthProps, AuthSchema } from "../model/types.ts";
import css from "./auth.module.css";

export class AuthPage extends Page<AuthProps, AuthSchema> {
  private footerModifier: string = "";

  constructor(props: ComponentProps<AuthProps, AuthSchema>) {
    const { deps, data } = props;

    super({ deps, data });

    this.footerModifier =
      data.configs.type === "sign-up" ? css.authFooter_signUp : "";
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!this.children) {
      throw new Error("children is not defined");
    }

    const { inputs, buttonReroute } = this.children;


    const formValidator = new FormValidator(inputs);

    this._setRerouteEvent(buttonReroute);
    this._setInputsEvents(inputs, formValidator);
    this._setSubmitEvent(formValidator);
  }

  private _setSubmitEvent(formValidator: FormValidator): void {
    this.setProps({
      events: {
        submit: (e: Event) =>
          formValidator.onFormSubmit(e, RouteLink.Chats, this.authType),
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
    const headingSlotKey = getChildSlotKey(this.childrenData!, "heading");
    const inputsSlotKey = getChildSlotKey(this.childrenData!, "inputs");
    const buttonRerouteSlotKey = getChildSlotKey(
      this.childrenData!,
      "buttonReroute",
    );
    const buttonFormSubmitSlotKey = getChildSlotKey(
      this.childrenData!,
      "buttonFormSubmit",
    );

    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ ${headingSlotKey} }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.inputsWrapper}">
            {{{ ${inputsSlotKey} }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${this.footerModifier}">
          {{{ ${buttonRerouteSlotKey} }}}
          {{{ ${buttonFormSubmitSlotKey} }}}
        </footer>
    `;
  }
}

export const createAuthPage: ComponentFactory<
  AuthProps,
  AuthMap,
  AuthSchema
> = (data: ComponentData<AuthProps, AuthSchema>): AuthPage => {
  if (!data.childrenSchema) {
    throw new Error("childrenSchema is not defined");
  }

  const children = buildChildren(data.childrenSchema);

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new AuthPage({
    deps,
    data: {
      ...data,
      ...children,
    },
  });
};
