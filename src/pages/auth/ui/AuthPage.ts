import Router from "../../../app/providers/router/Router.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { getInstances } from "../../../shared/lib/helpers/factory/functions.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import { RouteLink } from "../../../shared/types/universal.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Input } from "../../../shared/ui/Input/Input.ts";
import { InputProps } from "../../../shared/ui/Input/types.ts";
import { Page } from "../../page/ui/Page.ts";
import { AuthNodes, AuthProps } from "../model/types.ts";
import css from "./auth.module.css";

export class AuthPage extends Page<AuthProps> {
  private footerModifier: string = "";

  constructor(props: ComponentProps<AuthProps, AuthPage>) {
    super(props);

    this.footerModifier =
      props.node.params.configs.type === "sign-up" ? css.authFooter_signUp : "";

    // console.log(this);
  }

  public componentDidMount(): void {
    if (!this.children?.edges) {
      throw new Error("children is not defined");
    }

    /* --- getting instances --- */
    const { buttonReroute } = this.children.nodes as AuthNodes;
    const reroute = buttonReroute.runtime?.instance as Button;
    const inputs = getInstances<InputProps, Input>(this.children, "inputs");
    const formValidator = new FormValidator(inputs);

    /* --- setting events --- */
    this._wireSubmit(formValidator);
    this._wireReroute(reroute);
    this._vivifyInputs(inputs, formValidator);
  }

  private _wireSubmit(formValidator: FormValidator): void {
    this.setProps({
      on: {
        submit: (e: Event) => formValidator.onFormSubmit(e, this.configs.type),
      },
    });
  }

  /* event for the auth-reroute button */
  private _wireReroute(buttonReroute: Button): void {
    buttonReroute.setProps({
      on: {
        click: () =>
          Router.go(buttonReroute.configs.link ?? RouteLink.NotFound),
      },
    });
  }

  /* blur-events for the input fields */
  private _vivifyInputs(inputs: Input[], formValidator: FormValidator): void {
    inputs.forEach((input) => {
      input.setProps({
        on: {
          focusout: () => formValidator.onInputBlur(input),
        },
      });
    });
  }

  public getSourceMarkup(): string {
    if (!this.children?.nodes)
      return /*html*/ `<span>ERROR: AuthPage: Children are not defined</span>`;

    const { heading, buttonFormSubmit, buttonReroute } = this.children
      .nodes as AuthNodes;

    return /*html*/ `
      <header class="${css.authHeading}">
        {{{ ${heading.params.configs.id} }}}
      </header>

      <main class="${css.authContent}">
        <div class="${css.inputsWrapper}">
          {{{ inputs }}}
        </div>
      </main>

      <footer class="${css.authFooter} ${this.footerModifier}">
        {{{ ${buttonReroute.params.configs.id} }}}
        {{{ ${buttonFormSubmit.params.configs.id} }}}
      </footer> 
      `;
  }
}
