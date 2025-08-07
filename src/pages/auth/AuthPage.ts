import { Button } from "../../components/button/Button.ts";
import { Input } from "../../components/input/Input.ts";
import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import {
  BaseProps,
  IComponentData,
  IComponentFactory
} from "../../framework/Component/Component.d";
import Component, {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { createChildren } from "../../utils/componentFactory.ts";
import { IAuthChildren, IAuthChildrenData, IAuthConfigs } from "./auth.d";
import css from "./auth.module.css";
import { FormController } from "./FormController.ts";

export interface AuthProps extends BaseProps {
  configs: IAuthConfigs;
  attributes?: BaseProps["attributes"];
  events?: BaseProps["events"];
  childrenData?: IAuthChildrenData;
}

export class AuthPage extends Component<AuthProps> {
  private footerModifier: string = "";

  constructor(props: ComponentParams) {
    const { deps, data } = props;

    super({ deps, data });

    this.footerModifier =
      data.configs.type === "/sign-up" ? css.authFooter_signUp : "";
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const children = this.children as IAuthChildren;
    const formController = new FormController(children.inputs.children);

    this._setRerouteEvent(children.buttonReroute.child);
    this._setInputsEvents(children.inputs.children, formController);
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
    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ ${this.childrenData?.heading.data.configs.slotKey} }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.inputsWrapper}">
            {{{ ${this.childrenData?.inputs.listKey} }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${this.footerModifier}">
          {{{ ${this.childrenData?.buttonReroute.data.configs.slotKey} }}}
          {{{ ${this.childrenData?.buttonFormSubmit.data.configs.slotKey} }}}
        </footer>
    `;
  }
}

export const createAuthPage: IComponentFactory<AuthProps> = (
  data: IComponentData
): AuthPage => {
  if (!data.childrenData) {
    throw new Error("AuthPage: ChildrenData are not defined");
  }

  const {childrenData} = data;

  const children = createChildren(childrenData) as IAuthChildren;
  const inputs = children.inputs.children;
  const formController = new FormController(inputs);

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  const preparedData = {
    ...data,
    children,
    events: {
      submit: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
    },
  };

  return new AuthPage({ deps, data: preparedData });
};
