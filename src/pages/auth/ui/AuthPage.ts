import { Button } from "../../components/button/Button.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Router from "../../../app/providers/router/Router.ts";
import { ChildrenData } from "../../framework/Component/children";
import {
  BaseProps,
  ComponentData,
} from "../../framework/Component/component";
import { ComponentParams } from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildrenFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { PageFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import { Page } from "../../page/ui/Page.ts";
import { AuthChildrenDataPropsMap, AuthType, AuthConfigs } from "../model/types.ts";
import css from "./auth.module.css";
import { Input } from "../../../shared/ui/Input/model/Input.ts";

export interface AuthProps extends BaseProps {
  configs: AuthConfigs;
  attributes?: BaseProps["attributes"];
  events?: BaseProps["events"];
  childrenData?: ChildrenData<AuthChildrenDataPropsMap>;
}

export class AuthPage extends Page<AuthProps> {
  private footerModifier: string = "";
  private authType: AuthType;

  constructor(props: ComponentParams) {
    const { deps, data } = props;

    super({ deps, data });

    this.authType = data.configs.type as AuthType;
    this.footerModifier =
      this.authType === "sign-up" ? css.authFooter_signUp : "";
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const inputs = getChildrenFromMap(this.children!, "inputs");
    const buttonReroute = getChildFromMap(this.children!, "buttonReroute");

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

export const createAuthPage: PageFactory<AuthProps> = (
  data: ComponentData,
): AuthPage => {
  if (!data.childrenData) {
    throw new Error("AuthPage: ChildrenData are not defined");
  }

  const { childrenData } = data;

  const children = createChildren(childrenData);

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new AuthPage({
    deps,
    data: {
      ...data,
      children,
    },
  });
};
