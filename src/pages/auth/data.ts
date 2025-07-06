import { SignInData, SignUpData } from "./auth.d";

export const signUpData: SignUpData = {
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
    },
    {
      id: "second_name",
      type: "text",
      __label: "Фамилия",
    },
    {
      id: "login",
      type: "text",
      __label: "Логин",
    },
    {
      id: "email",
      type: "email",
      __label: "Эл. почта",
    },
    {
      id: "password",
      type: "password",
      __label: "Пароль",
    },
    {
      id: "phone",
      type: "tel",
      __label: "Номер телефона",
    },
  ],
  buttonData: [
    {
      __modifier: "button",
      type: "submit",
      __label: "Зарегистрироваться ✓",
      __link: "/chats",
    },
  ],
};

export const signInData: SignInData = {
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
    },
    {
      id: "password",
      type: "password",
      __label: "Пароль",
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
