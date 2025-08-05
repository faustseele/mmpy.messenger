import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import {
  ComponentProps,
  IComponentAttributes,
  IComponentData,
  IComponentEvents,
  IComponentFactory,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { createChildren } from "../../utils/componentFactory.ts";
import { IAuthChildrenData, IAuthChildrenMap, IAuthConfigs } from "./auth.d";
import css from "./auth.module.css";
import { FormController } from "./FormController.ts";

export class AuthPage extends Component<
  IAuthConfigs,
  IComponentAttributes,
  IComponentEvents,
  IAuthChildrenData
> {
  private footerModifier: string = "";

  constructor(
    props: ComponentProps<
      IAuthConfigs,
      IComponentAttributes,
      IComponentEvents,
      IAuthChildrenData
    >,
  ) {
    const { deps, data } = props;

    if (!data.childrenData) {
      console.error("AuthPage: Children are not defined");
      return;
    }

    const childrenMap = createChildren(data.childrenData);

    const inputs = (childrenMap as IAuthChildrenMap).inputs.list;

    const formController = new FormController(inputs);

    data.childrenMap = childrenMap;

    data.events = {
      submit: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
    };

    super({ deps, data });

    // const buttonReroute = children.buttonReroute as Button;

    this.footerModifier =
      data.configs.type === "/sign-up" ? css.authFooter_signUp : "";

    /**
     * TODO: move side-effects to componentDidMount */
    /* Setting event for the auth-reroute button */
    (data.childrenMap as IAuthChildrenMap).buttonReroute.setProps({
      events: {
        click: () =>
          Router.go(
            (data.childrenMap as IAuthChildrenMap)!.buttonReroute.configs
              .link ?? RouteLink.NotFound,
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
    return /*html*/ `
        <header class="${css.authHeading}">
          {{{ ${this.childrenData?.heading.configs.slotName} }}}
        </header>

        <main class="${css.authContent}">
          <div class="${css.inputsWrapper}">
            {{{ ${this.childrenData?.inputs.slotName} }}}
          </div>
        </main>

        <footer class="${css.authFooter} ${this.footerModifier}">
          {{{ ${this.childrenData?.buttonReroute.configs.slotName} }}}
          {{{ ${this.childrenData?.buttonFormSubmit.configs.slotName} }}}
        </footer>
    `;
  }
}

type CF = IComponentFactory<
  IAuthConfigs,
  IComponentAttributes,
  IComponentEvents,
  AuthPage
>;

type D = IComponentData<
  IAuthConfigs,
  IComponentAttributes,
  IComponentEvents,
  IAuthChildrenData,
  AuthPage
>;

export const createAuthPage: CF = (data: D): AuthPage => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new AuthPage({ deps, data });
};
