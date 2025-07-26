import { RouteLink } from "../../core/Router/router.d";
import { IProfilePageConfigs } from "./profile.d";

export const profileData: IProfilePageConfigs = {
  __profileName: "Vanya",
  headingConfigs_profile: {
    __text: "Профиль 👤",
  },
  headingConfigs_backToChats: {
    __text: "⮘ Назад",
    __isClickable: true,
    __link: "/chats",
  },
  inputEditorConfigs: [
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
  buttonProps_editInfo: {
    configs: {
      type: "button",
      __label: "Изменить данные",
      __link: RouteLink.Chats,
    },
    events: {},
  },
  buttonProps_editPassword: {
    configs: {
      type: "button",
      __label: "Изменить пароль",
      __link: RouteLink.Chats,
    },
    events: {},
  },
  buttonProps_signOut: {
    configs: {
      type: "button",
      __label: "Выйти",
      __isSilent: true,
      __link: RouteLink.SignIn,
    },
    events: {},
  },
};
