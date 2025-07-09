import { IAuthPageData } from "./auth.d";

export const signUpData: IAuthPageData = {
  type: "/sign-up",
  headingData: {
    __text: "Регистрация 🎀",
  },
  inputData: [
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
  buttonData_reroute: {
    configs: {
      type: "button",
      __label: "Я свой!",
      __isSilent: true,
      __link: "/sign-in",
    },
    events: {
      // click: () => console.log('click'),
    },
  },
  buttonData_submit: {
    configs: {
      type: "submit",
      __label: "Зарегистрироваться ✓",
      __isSilent: false,
    },
    events: {},
  },
};

export const signInData: IAuthPageData = {
  type: "/sign-in",
  headingData: {
    __text: "Вход 🚪",
  },
  inputData: [
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
  buttonData_reroute: {
    configs: {
      type: "button",
      __label: "Впервые?",
      __isSilent: true,
      __link: "/sign-up",
    },
    events: {},
  },
  buttonData_submit: {
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
