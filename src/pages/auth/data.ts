import cssBtn from "../../components/button/button.module.css";
import cssHeading from "../../components/heading/heading.module.css";
import cssInput from "../../components/input/input.module.css";
import { createButton } from "../../components/button/Button.ts";
import { createHeading } from "../../components/heading/Heading.ts";
import { createInput } from "../../components/input/Input.ts";
import { RouteLink } from "../../core/Router/router.d";
import {
  IComponentAttributes,
  IComponentEvents,
  IComponentFactory,
} from "../../framework/Component/Component.d";
import cssPage from "../pages.module.css";
import { IAuthChildrenData, IAuthConfigs, IAuthData } from "./auth.d";
import { AuthPage, createAuthPage } from "./AuthPage.ts";

function createAuthPageData(
  configs: IAuthConfigs,
  attributes: IComponentAttributes,
  childrenData: IAuthChildrenData,
  componentFactory: IComponentFactory<
    IAuthConfigs,
    IComponentAttributes,
    IComponentEvents,
    AuthPage
  >,
): IAuthData<IAuthConfigs, IComponentAttributes, IComponentEvents> {
  return { configs, attributes, childrenData, componentFactory };
}

const signUpChildrenData: IAuthChildrenData = {
  heading: {
    configs: {
      slotName: "heading",
      tagName: "h1",
      type: "/sign-up",
      text: "Регистрация 🎀",
    },
    attributes: {
      _class: cssHeading.heading,
    },
    componentFactory: createHeading,
  },
  inputs: {
    slotName: "inputs",
    list: [
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Имя",
          type: "text",
          isError: false,
          errorMessage: "",
          id: "name",
          placeholder: "Имя",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "name",
        },
      },
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Фамилия",
          type: "text",
          isError: false,
          errorMessage: "",
          id: "surname",
          placeholder: "Фамилия",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "surname",
        },
      },
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Логин",
          type: "text",
          isError: false,
          errorMessage: "",
          id: "login",
          placeholder: "Логин",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "login",
        },
      },
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Эл. почта",
          type: "email",
          isError: false,
          errorMessage: "",
          id: "email",
          placeholder: "Эл. почта",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "email",
        },
      },
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Пароль",
          type: "password",
          isError: false,
          errorMessage: "",
          id: "password",
          placeholder: "Пароль",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "password",
        },
      },
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Номер телефона",
          type: "tel",
          isError: false,
          errorMessage: "",
          id: "phone",
          placeholder: "Номер телефона",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "phone",
        },
      },
    ],
    componentFactory: createInput,
  },
  buttonFormSubmit: {
    configs: {
      slotName: "buttonFormSubmit",
      label: "Зарегистрироваться ✓",
      tagName: "button",
      type: "submit",
      isSilent: false,
    },
    componentFactory: createButton,
    attributes: {
      type: "submit",
      _class: `${cssBtn.button}`,
    },
  },
  buttonReroute: {
    configs: {
      slotName: "buttonReroute",
      label: "Я свой!",
      tagName: "button",
      type: "button",
      isSilent: true,
      link: RouteLink.SignIn,
    },
    componentFactory: createButton,
    attributes: {
      type: "button",
      _class: `${cssBtn.button} ${cssBtn.button_silent}`,
    },
  },
};

const signInChildrenData: IAuthChildrenData = {
  heading: {
    configs: {
      slotName: "heading",
      tagName: "h1",
      type: "/sign-in",
      text: "Вход 🚪",
    },
    attributes: {
      _class: cssHeading.heading,
    },
    componentFactory: createHeading,
  },
  inputs: {
    slotName: "inputs",
    list: [
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Логин",
          type: "text",
          isError: false,
          errorMessage: "",
          id: "login",
          name: "login",
          placeholder: "Логин",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "login",
        },
      },
      {
        configs: {
          slotName: "input",
          tagName: "label",
          label: "Пароль",
          type: "password",
          isError: false,
          errorMessage: "",
          id: "password",
          placeholder: "Пароль",
          name: "password",
        },
        componentFactory: createInput,
        attributes: {
          _class: cssInput.inputWrap,
          for: "password",
        },
      },
    ],
    componentFactory: createInput,
  },
  buttonReroute: {
    configs: {
      slotName: "buttonReroute",
      label: "Впервые?",
      tagName: "button",
      type: "button",
      isSilent: true,
      link: RouteLink.SignUp,
    },
    componentFactory: createButton,
    attributes: {
      type: "button",
      _class: `${cssBtn.button} ${cssBtn.button_silent}`,
    },
  },
  buttonFormSubmit: {
    configs: {
      slotName: "buttonFormSubmit",
      label: "Авторизоваться ✓",
      tagName: "button",
      type: "submit",
      isSilent: false,
    },
    componentFactory: createButton,
    attributes: {
      type: "submit",
      _class: `${cssBtn.button}`,
    },
  },
};

export const signUpData = createAuthPageData(
  {
    slotName: "authPage",
    tagName: "form",
    type: "/sign-up",
  },
  {
    _class: cssPage.moduleWindow,
  },
  signUpChildrenData,
  createAuthPage,
);

export const signInData = createAuthPageData(
  {
    slotName: "authPage",
    tagName: "form",
    type: "/sign-in",
  },
  {
    _class: cssPage.moduleWindow,
  },
  signInChildrenData,
  createAuthPage,
);

export const signUpRouteConfig = {
  path: RouteLink.SignUp,
  rootQuery: "#app",
};

export const signInRouteConfig = {
  path: RouteLink.SignIn,
  rootQuery: "#app",
};
