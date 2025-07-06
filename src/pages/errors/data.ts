import { IErrorPageData } from "./errors.d";

export const errorData404: IErrorPageData = {
  __code: "404",
  headingData: [
    {
      __text: "⛔ Ошибка ️404",
      __isDrama: true,
    },
  ],
  subheadingData: [
    {
      __text: "🌑 Не туда попали",
      __isDrama: true,
    },
  ],

  buttonData: [
    {
      type: "button",
      __label: "Назад к чатам",
      __link: "/chats",
    },
  ],
};

export const errorData500: IErrorPageData = {
  __code: "500",
  headingData: [
    {
      __text: "🪜 Ошибка ️500",
      __isDrama: true,
    },
  ],
  subheadingData: [
    {
      __text: "🔧 Мы уже фиксим",
      __isDrama: true,
    },
  ],

  buttonData: [
    {
      type: "button",
      __label: "Назад к чатам",
      __link: "/chats",
    },
  ],
};
