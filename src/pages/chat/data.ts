import { ChatData } from "./chat.d";
import participantAvatar from "../../../static/avatar.png";
import sunsetImage from "../../../static/sunset.jpeg";

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
      isSilent: true,
    },
  ],
  messageData: [
    {
      isOutgoing: false,
      isIncoming: true,
      isDateBubble: false,
      text: "Привет! Как дела?",
      date: "10:25",
    },
    {
      isOutgoing: true,
      isIncoming: false,
      isDateBubble: false,
      text: "Привет, Андрей! Всё отлично, а у тебя?",
      date: "10:26",
    },
    {
      isOutgoing: false,
      isIncoming: false,
      isDateBubble: true,
      date: "Сегодня, 12:00",
    },
    {
      isOutgoing: false,
      isIncoming: true,
      isDateBubble: false,
      text: "Посмотри, какой закат!",
      date: "12:05",
    },
    {
      isOutgoing: false,
      isIncoming: true,
      isDateBubble: false,
      image: sunsetImage,
      date: "12:06",
    },
    {
      isOutgoing: false,
      isIncoming: true,
      isDateBubble: false,
      text: "Пойдём вечером гулять?",
      date: "12:07",
    },
    {
      isOutgoing: true,
      isIncoming: false,
      isDateBubble: false,
      text: "Да, давай! Во сколько?",
      date: "12:08",
    },
  ],
};
