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
  inputMessage: {
    id: "message",
    label: "Cообщение",
    placeholder: "Cообщение",
    type: "text",
  },
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
      Ascendant: true,
      text: "Посмотри, какой закат!",
      image: sunsetImage,
      date: "12:05",
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
    {
      isOutgoing: false,
      isIncoming: true,
      isDateBubble: false,
      text: "О, вечер — время, когда улицы шепчут тайны, а фонари отбрасывают тени, длинные, как мысли Одиссея. В семь, у старого дуба?",
      date: "12:10",
    },
    {
      isOutgoing: true,
      isIncoming: false,
      isDateBubble: false,
      text: "Семь — час, когда мир затихает, и душа, как река, течёт к тому дубу, где мы встретимся. Буду там, с сердцем, полным слов.",
      date: "12:12",
    },
    {
      isOutgoing: false,
      isIncoming: true,
      isDateBubble: false,
      text: "Ты всегда так говоришь, будто пишешь книгу! Но мне нравится. Принеси свой смех, он ярче звёзд.",
      date: "12:15",
    },
    {
      isOutgoing: true,
      isIncoming: false,
      isDateBubble: false,
      text: "Мой смех — лишь эхо твоего, отражённое в зеркале ночи. До встречи, о звезда моя!",
      date: "12:17",
    },
  ],
};
