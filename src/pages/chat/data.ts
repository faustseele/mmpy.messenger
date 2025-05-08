import { ChatData } from "./chat.d";
import particantAvatar from "../../../static/avatar.png"

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
  button_removeChat: "Удалить чат",
  inputMessageLabel: "Cообщение",
  chatData: {
    particantAvatar: particantAvatar,
    participantName: "Андрей"
  }
};
