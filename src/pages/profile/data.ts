import { Routes } from "../../core/Router/routes.d";
import { IProfilePageData } from "./profile.d";

export const profileData: IProfilePageData = {
  __profileName: "Vanya",
  headingData_profile: {
    __text: "Профиль 👤",
  },
  headingData_backToChats: {
    __text: "⮘ Назад",
    __isClickable: true,
    __link: "/chats",
  },
  inputEditorData: [
    {
      id: "email",
      type: "email",
      __label: "Эл. почта",
      placeholder: "pochta@yandex.ru",
    },
    {
      id: "name",
      type: "text",
      __label: "Имя",
      placeholder: "Иван",
    },
    {
      id: "surname",
      type: "text",
      __label: "Фамилия",
      placeholder: "Иванов",
    },
    {
      id: "login",
      type: "text",
      __label: "Логин",
      placeholder: "ivanov",
    },
    {
      id: "display_name",
      type: "text",
      __label: "Имя в чате",
      placeholder: "Vanya",
    },
    {
      id: "phone",
      type: "tel",
      __label: "Номер телефона",
      placeholder: "8905551234",
    },
  ],
  buttonData_editInfo: {
    configs: {
      type: "button",
      __label: "Изменить данные",
      __link: Routes.Chats,
    },
    events: {},
  },
  buttonData_editPassword: {
    configs: {
      type: "button",
      __label: "Изменить пароль",
      __link: Routes.Chats,
    },
    events: {},
  },
  buttonData_signOut: {
    configs: {
      type: "button",
      __label: "Выйти",
      __isSilent: true,
      __link: Routes.SignIn,
    },
    events: {},
  },
};
