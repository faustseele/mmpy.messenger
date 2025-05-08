import { ChatData } from "./chat.d";
import participantAvatar from "../../../static/avatar.png";

export const chatData: ChatData = {
  headingData: [
    {
      text: "Чаты 👥",
    },
    {
      text: "Профиль ➛",
      isClickable: true,
      link: "/profile",
    },
  ],
  searchLabel: "Поиск",
  catalogueItemData: [
    {
      title: "Андрей",
      contentText: "Привет, я Андрей! Чат с Андреем для тестов",
      date: "10 мин",
      unreadCount: "2",
    },
    {
      title: "Вася",
      contentText: "Я Вася, сейчас я напишу это сообщение со всех аккаунтов",
      date: "15:44",
      unreadCount: "1",
    },
  ],
  inputMessageLabel: "Cообщение",
  chatData: {
    participantAvatar,
    participantName: "Андрей",
  },
  buttonData: [
    {
      modifier: "button",
      type: "button",
      label: "Удалить чат",
      link: "/404",
      isSilent: true
    },
  ],
};
