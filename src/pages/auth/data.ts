import { RouteLink } from "../../core/Router/router.d";
import { IAuthPageConfigs } from "./auth.d";

export const signUpData: IAuthPageConfigs = {
  type: "/sign-up",
  headingConfigs: {
    __text: "Регистрация 🎀",
  },
  inputConfigs: [
    {
      id: "name",
      type: "text",
      __label: "Имя",
      placeholder: "Имя",
    },
    {
      id: "surname",
      type: "text",
      __label: "Фамилия",
      placeholder: "Фамилия",
    },
    {
      id: "login",
      type: "text",
      __label: "Логин",
      placeholder: "Логин",
    },
    {
      id: "email",
      type: "email",
      __label: "Эл. почта",
      placeholder: "Эл. почта",
    },
    {
      id: "password",
      type: "password",
      __label: "Пароль",
      placeholder: "Пароль",
    },
    {
      id: "phone",
      type: "tel",
      __label: "Номер телефона",
      placeholder: "Номер телефона",
    },
  ],
  buttonProps_reroute: {
    configs: {
      type: "button",
      __label: "Я свой!",
      __isSilent: true,
      __link: RouteLink.SignIn,
    },
    events: { },
  },
  buttonProps_submit: {
    configs: {
      type: "submit",
      __label: "Зарегистрироваться ✓",
      __isSilent: false,
    },
    events: {},
  },
};

export const signInData: IAuthPageConfigs = {
  type: "/sign-in",
  headingConfigs: {
    __text: "Вход 🚪",
  },
  inputConfigs: [
    {
      id: "login",
      type: "text",
      __label: "Логин",
      placeholder: "Логин",
    },
    {
      id: "password",
      type: "password",
      __label: "Пароль",
      placeholder: "Пароль",
    },
  ],
  buttonProps_reroute: {
    configs: {
      type: "button",
      __label: "Впервые?",
      __isSilent: true,
      __link: RouteLink.SignUp,
    },
    events: {},
  },
  buttonProps_submit: {
    configs: {
      type: "submit",
      __label: "Авторизоваться ✓",
      __isSilent: false,
    },
    events: {
      /* Submit handling is added dynamically */
    },
  },
};
