import { IProfilePageData } from "./profile.d";

export const profileData: IProfilePageData = {
  __name: "Vanya",
  headingData: [
    {
      __text: "⮘ Назад",
      __isClickable: true,
      __link: "/chats",
    },
    {
      __text: "Профиль 👤",
    },
  ],
  profileData: {
    __name: "Vanya",
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
  buttonDataEditInfo: {
    configs: {
      type: "button",
      __label: "Изменить данные",
      __link: "/chats",
    },
    events: {},
  },
  buttonDataEditPassword: {
    configs: {
      type: "button",
      __label: "Изменить пароль",
      __link: "/chats",
    },
    events: {},
  },
  buttonDataLogout: {
    configs: {
      type: "button",
      __label: "Выйти",
      __isSilent: true,
      __link: "/sign-in",
    },
    events: {},
  },
};
