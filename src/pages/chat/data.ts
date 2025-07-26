import participantAvatar from "../../../static/avatar.png";
import sunsetImage from "../../../static/sunset.jpeg";
import { RouteLink } from "../../core/Router/router.d";
import { IChatPageConfigs } from "./chat.d";

export const chatData: IChatPageConfigs = {
  headingConfigs_chats: {
    __text: "Чаты 👥",
    __isClickable: false,
    __isDrama: false,
  },
  headingConfigs_goToProfile: {
    __text: "Профиль ➛",
    __isClickable: true,
    __link: "/profile",
  },
  searchLabel: "Поиск",
  catalogueItemsConfigs: [
    {
      __title: "Андрей",
      __contentText: "Привет, я Андрей! Чат с Андреем для тестов",
      __date: "10 мин",
      __unreadCount: "2",
    },
    {
      __title: "Вася",
      __contentText: "Я Вася, сейчас я напишу это сообщение со всех аккаунтов",
      __date: "15:44",
      __unreadCount: "1",
    },
  ],
  messageFieldConfigs: {
    id: "message",
    __label: "Cообщение",
    placeholder: "Cообщение",
    type: "text",
  },
  chatData: {
    participantAvatar,
    __participantName: "Андрей",
  },
  buttonProps_delete: {
    configs: {
      type: "button",
      __modifier: "button",
      __label: "Удалить чат",
      __link: RouteLink.NotFound,
      __isSilent: true,
    },
    events: {},
  },
  messagesConfigs: [
    {
      __isOutgoing: false,
      __isIncoming: true,
      __isDateBubble: false,
      __text: "Привет! Как дела?",
      __date: "10:25",
    },
    {
      __isOutgoing: true,
      __isIncoming: false,
      __isDateBubble: false,
      __text: "Привет, Андрей! Всё отлично, а у тебя?",
      __date: "10:26",
    },
    {
      __isOutgoing: false,
      __isIncoming: false,
      __isDateBubble: true,
      __date: "Сегодня, 12:00",
    },
    {
      __isOutgoing: false,
      __isIncoming: true,
      __isDateBubble: false,
      __text: "Посмотри, какой закат!",
      __image: sunsetImage,
      __date: "12:05",
    },
    {
      __isOutgoing: false,
      __isIncoming: true,
      __isDateBubble: false,
      __text: "Пойдём вечером гулять?",
      __date: "12:07",
    },
    {
      __isOutgoing: true,
      __isIncoming: false,
      __isDateBubble: false,
      __text: "Да, давай! Во сколько?",
      __date: "12:08",
    },
    {
      __isOutgoing: false,
      __isIncoming: true,
      __isDateBubble: false,
      __text:
        "О, вечер — время, когда улицы шепчут тайны, а фонари отбрасывают тени, длинные, как мысли Одиссея. В семь, у старого дуба?",
      __date: "12:10",
    },
    {
      __isOutgoing: true,
      __isIncoming: false,
      __isDateBubble: false,
      __text:
        "Семь — час, когда мир затихает, и душа, как река, течёт к тому дубу, где мы встретимся. Буду там, с сердцем, полным слов.",
      __date: "12:12",
    },
    {
      __isOutgoing: false,
      __isIncoming: true,
      __isDateBubble: false,
      __text:
        "Ты всегда так говоришь, будто пишешь книгу! Но мне нравится. Принеси свой смех, он ярче звёзд.",
      __date: "12:15",
    },
    {
      __isOutgoing: true,
      __isIncoming: false,
      __isDateBubble: false,
      __text:
        "Мой смех — лишь эхо твоего, отражённое в зеркале ночи. До встречи, о звезда моя!",
      __date: "12:17",
    },
  ],
};
