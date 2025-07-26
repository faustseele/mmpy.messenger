import { RouteLink } from "../../core/Router/router.d";
import { IErrorPageConfigs } from "./errors.d";

export const errorData404: IErrorPageConfigs = {
  __code: "404",
  headingConfigs: {
    __text: "⛔ Ошибка ️404",
    __isDrama: true,
  },
  subheadingConfigs: {
    __text: "🌑 Не туда попали",
    __isDrama: true,
  },

  buttonConfigs: {
    type: "button",
    __label: "Назад к чатам",
    __link: RouteLink.Chats,
  },
};

export const errorData500: IErrorPageConfigs = {
  __code: "500",
  headingConfigs: {
    __text: "🪜 Ошибка ️500",
    __isDrama: true,
  },
  subheadingConfigs: {
    __text: "🔧 Мы уже фиксим",
    __isDrama: true,
  },

  buttonConfigs: {
    type: "button",
    __label: "Назад к чатам",
    __link: RouteLink.Chats,
  },
};
