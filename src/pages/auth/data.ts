import cssBtn from "../../components/button/button.module.css";
import { createButton } from "../../components/button/Button.ts";
import cssHeading from "../../components/heading/heading.module.css";
import { createHeading } from "../../components/heading/Heading.ts";
import cssInput from "../../components/input/input.module.css";
import { createInput } from "../../components/input/Input.ts";
import { IRouteConfigs, RouteLink } from "../../core/Router/router.d";
import { IChildrenData } from "../../framework/Component/Children.d";
import cssPage from "../pages.module.css";
import { AuthChildrenDataPropsMap } from "./auth.d";
import { AuthProps } from "./AuthPage.ts";

/**
 * Todo:
 * Make the attributes more dev-friendly.
 * - less attributes -- classes should be predetermined in ConreteComponents
 * - themes (like isDrama) over attributes
 */

function createAuthProps(
  configs: AuthProps["configs"],
  attributes: AuthProps["attributes"],
  events: AuthProps["events"],
  childrenData: AuthProps["childrenData"],
): AuthProps {
  return { configs, attributes, events, childrenData };
}

const signUpChildrenData: IChildrenData<AuthChildrenDataPropsMap> = {
  heading: {
    type: "single",
    data: {
      configs: {
        slotKey: "heading",
        tagName: "h1",
        type: "/",
        text: "Регистрация 🎀",
      },
      attributes: {
        className: cssHeading.heading,
      },
      componentFactory: createHeading,
    },
  },
  inputs: {
    type: "list",
    slotKey: "inputs",
    childrenFactory: createInput,
    dataList: [
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "name",
        },
      },
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "surname",
        },
      },
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "login",
        },
      },
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "email",
        },
      },
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "password",
        },
      },
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "phone",
        },
      },
    ],
  },
  buttonFormSubmit: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonFormSubmit",
        label: "Зарегистрироваться ✓",
        tagName: "button",
        type: "submit",
      },
      componentFactory: createButton,
      attributes: {
        type: "submit",
        className: `${cssBtn.button}`,
      },
    },
  },
  buttonReroute: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonReroute",
        label: "Я свой!",
        tagName: "button",
        type: "button",
        link: RouteLink.SignIn,
      },
      componentFactory: createButton,
      attributes: {
        type: "button",
        className: `${cssBtn.button} ${cssBtn.button_silent}`,
      },
    },
  },
};

const signInChildrenData: IChildrenData<AuthChildrenDataPropsMap> = {
  heading: {
    type: "single",
    data: {
      configs: {
        slotKey: "heading",
        tagName: "h1",
        type: "/sign-in",
        text: "Вход 🚪",
      },
      attributes: {
        className: cssHeading.heading,
      },
      componentFactory: createHeading,
    },
  },
  inputs: {
    type: "list",
    slotKey: "inputs",
    childrenFactory: createInput,
    dataList: [
      {
        configs: {
          slotKey: "input",
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
          className: cssInput.inputLabelWrap,
          for: "login",
        },
      },
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          label: "Пароль",
          type: "password",
          name: "password",
          isError: false,
          errorMessage: "",
          id: "password",
          placeholder: "Пароль",
        },
        componentFactory: createInput,
        attributes: {
          className: cssInput.inputLabelWrap,
          for: "password",
        },
      },
    ],
  },
  buttonReroute: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonReroute",
        label: "Впервые?",
        tagName: "button",
        type: "button",
        link: RouteLink.SignUp,
      },
      componentFactory: createButton,
      attributes: {
        type: "button",
        className: `${cssBtn.button} ${cssBtn.button_silent}`,
      },
    },
  },
  buttonFormSubmit: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonFormSubmit",
        label: "Авторизоваться ✓",
        tagName: "button",
        type: "submit",
      },
      componentFactory: createButton,
      attributes: {
        type: "submit",
        className: `${cssBtn.button}`,
      },
    },
  },
};

export const signUpData = createAuthProps(
  {
    slotKey: "authPage",
    tagName: "form",
    type: "/",
  },
  {
    className: cssPage.moduleWindow,
  },
  {},
  signUpChildrenData,
);

export const signInData = createAuthProps(
  {
    slotKey: "authPage",
    tagName: "form",
    type: "/sign-in",
  },
  {
    className: cssPage.moduleWindow,
  },
  {},
  signInChildrenData,
);

export const signUpRouteConfig: IRouteConfigs = {
  path: RouteLink.SignUp,
  rootQuery: "#app",
  authStatus: "guest",
  params: {},
};

export const signInRouteConfig: IRouteConfigs = {
  path: RouteLink.SignIn,
  rootQuery: "#app",
  authStatus: "guest",
  params: {},
};
