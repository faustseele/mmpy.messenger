import { IAuthPageData } from "./auth.d";

export const signUpData: IAuthPageData = {
  type: "/sign-up",
  headingData: [
    {
      __text: "Регистрация 🎀",
    },
  ],
  inputData: [
    {
      id: "first_name",
      type: "text",
      __label: "Имя",
      placeholder: "Имя",
    },
    {
      id: "second_name",
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
  buttonData: [
    {
      type: "submit",
      __modifier: "button",
      __label: "Зарегистрироваться ✓",
      __link: "/chats",
    },
  ],
};

export const signInData: IAuthPageData = {
  type: "/sign-in",
  headingData: [
    {
      __text: "Вход 🚪",
    },
  ],
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
  buttonData: [
    {
      type: "button",
      __label: "Впервые?",
      __isSilent: true,
      __link: "/sign-up",
    },
    {
      type: "submit",
      __label: "Авторизоваться ✓",
      __link: "/chats",
    },
  ],
};
