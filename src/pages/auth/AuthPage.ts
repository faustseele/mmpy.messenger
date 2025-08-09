import { Button } from "../../components/button/Button.ts";
import { Input } from "../../components/input/Input.ts";
import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { IChildrenData } from "../../framework/Component/Children.d";
import {
  BaseProps,
  IComponentData,
} from "../../framework/Component/Component.d";
import {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildrenFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import { FormController } from "../../services/forms/FormController.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IPageFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import { Page } from "../Page.ts";
import { AuthChildrenDataPropsMap, IAuthConfigs } from "./auth.d";
import css from "./auth.module.css";

export interface AuthProps extends BaseProps {
  configs: IAuthConfigs;
  attributes?: BaseProps["attributes"];
  events?: BaseProps["events"];
  childrenData?: IChildrenData<AuthChildrenDataPropsMap>;
}

export class AuthPage extends Page<AuthProps> {
  private footerModifier: string = "";

  constructor(props: ComponentParams) {
    const { deps, data } = props;

    super({ deps, data });

    this.footerModifier =
      data.configs.type === "/" ? css.authFooter_signUp : "";
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const inputs = getChildrenFromMap(this.children!, "inputs");
    const buttonReroute = getChildFromMap(this.children!, "buttonReroute");

    const formController = new FormController(inputs);

    this._setRerouteEvent(buttonReroute);
    this._setInputsEvents(inputs, formController);
    this._setSubmitEvent(formController);
  }

  private _setSubmitEvent(formController: FormController): void {
    this.setProps({
      events: {
        submit: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
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
    formController: FormController,
  ): void {
    inputs.forEach((input) => {
      input.setProps({
        events: {
          focusout: () => formController.onInputBlur(input),
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

export const createAuthPage: IPageFactory<AuthProps> = (
  data: IComponentData,
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
