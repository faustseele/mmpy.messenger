import participantAvatar from "../../../static/avatar.png";
import sunsetImage from "../../../static/sunset.jpeg";
import { createButton } from "../../components/button/Button.ts";
import catalogueItemCss from "../../components/catalogueItem/catalogueItem.module.css";
import { createCatalogueItem } from "../../components/catalogueItem/CatalogueItem.ts";
import { createHeading } from "../../components/heading/Heading.ts";
import { createInput } from "../../components/input/Input.ts";
import { MessageProps } from "../../components/message/message.d";
import { createMessage } from "../../components/message/Message.ts";
import messageFieldCss from "../../components/messageField/messageField.module.css";
import { createMessageField } from "../../components/messageField/MessageField.ts";
import { RouteConfigs, RouteLink } from "../../core/Router/router.d";
import { ChildrenData } from "../../framework/Component/children";
import { ComponentData } from "../../framework/Component/component";
import { ComponentFactory } from "../../utils/factory/factory.d";
import cssPages from "../pages.module.css";
import { ChatChildrenDataPropsMap, ChatPageProps } from "./chat.d";
import cssChat from "./chat.module.css";
import cssHeading from "../../components/heading/heading.module.css";
import cssBtn from "../../components/button/button.module.css";

const messages: {
  type: "list";
  slotKey: string;
  dataList: ComponentData<MessageProps>[];
  childrenFactory: ComponentFactory<MessageProps>;
} = {
  type: "list",
  slotKey: "messages",
  childrenFactory: createMessage,
  dataList: [
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "incoming",
        text: "Привет! Как дела?",
        date: "10:25",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "outgoing",
        text: "Привет, Андрей! Всё отлично, а у тебя?",
        date: "10:26",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "div",
        type: "date",
        date: "Сегодня, 12:00",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "incoming",
        text: "Посмотри, какой закат!",
        image: sunsetImage,
        date: "12:05",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "incoming",
        text: "Пойдём вечером гулять?",
        date: "12:07",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "outgoing",
        text: "Да, давай! Во сколько?",
        date: "12:08",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "incoming",
        text: "О, вечер — время, когда улицы шепчут тайны, а фонари отбрасывают тени, длинные, как мысли Одиссея. В семь, у старого дуба?",
        date: "12:10",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "outgoing",
        text: "Семь — час, когда мир затихает, и душа, как река, течёт к тому дубу, где мы встретимся. Буду там, с сердцем, полным слов.",
        date: "12:12",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "incoming",
        text: "Ты всегда так говоришь, будто пишешь книгу! Но мне нравится. Принеси свой смех, он ярче звёзд.",
        date: "12:15",
      },
      componentFactory: createMessage,
    },
    {
      configs: {
        slotKey: "message",
        tagName: "article",
        type: "outgoing",
        text: "Мой смех — лишь эхо твоего, отражённое в зеркале ночи. До встречи, о звезда моя!",
        date: "12:17",
      },
      componentFactory: createMessage,
    },
  ],
};

const chatChildrenData: ChildrenData<ChatChildrenDataPropsMap> = {
  heading_chats: {
    type: "single",
    data: {
      configs: {
        slotKey: "heading_chats",
        tagName: "h1",
        text: "Чаты 👥",
      },
      attributes: {
        className: cssHeading.heading,
      },
      componentFactory: createHeading,
    },
  },
  heading_goToProfile: {
    type: "single",
    data: {
      configs: {
        slotKey: "heading_goToProfile",
        tagName: "h1",
        text: "Профиль ➛",
        link: RouteLink.Settings,
      },
      attributes: {
        className: `${cssHeading.heading} ${cssHeading.heading__text_clickable}`,
      },
      componentFactory: createHeading,
    },
  },
  searchInput: {
    type: "single",
    data: {
      configs: {
        slotKey: "searchInput",
        tagName: "label",
        label: "Поиск",
        type: "text",
        id: "search",
        placeholder: "Поиск",
      },
      attributes: {
        className: cssChat.searchInput,
      },
      componentFactory: createInput,
    },
  },
  catalogueItems: {
    type: "list",
    slotKey: "catalogueItems",
    childrenFactory: createCatalogueItem,
    dataList: [
      {
        configs: {
          slotKey: "catalogueItem",
          tagName: "li",
          title: "Андрей",
          contentText: "Привет, я Андрей! Чат с Андреем для тестов",
          date: "10 мин",
          unreadCount: "2",
          avatar: participantAvatar,
        },
        attributes: { className: catalogueItemCss.catalogueItem },
        componentFactory: createCatalogueItem,
      },
      {
        configs: {
          slotKey: "catalogueItem",
          tagName: "li",
          title: "Вася",
          contentText:
            "Я Вася, сейчас я напишу это сообщение со всех аккаунтов",
          date: "15:44",
          unreadCount: "1",
          avatar: participantAvatar,
        },
        attributes: { className: catalogueItemCss.catalogueItem },
        componentFactory: createCatalogueItem,
      },
    ],
  },
  deleteChatButton: {
    type: "single",
    data: {
      configs: {
        slotKey: "deleteChatButton",
        tagName: "button",
        label: "Удалить чат",
        type: "button",
        link: RouteLink.NotFound,
      },
      attributes: {
        type: "button",
        className: `${cssBtn.button} ${cssBtn.button_silent}`,
      },
      componentFactory: createButton,
    },
  },
  messages,
  messageField: {
    type: "single",
    data: {
      configs: {
        slotKey: "messageField",
        tagName: "form",
        id: "message",
        label: "Cообщение",
        placeholder: "Cообщение",
        type: "text",
      },
      attributes: {
        className: messageFieldCss.inputLabelWrap,
      },
      componentFactory: createMessageField,
    },
  },
};

export const chatPageData: ChatPageProps = {
  configs: {
    slotKey: "chatPage",
    tagName: "div",
    participantAvatar: participantAvatar,
    participantName: "Андрей",
  },
  attributes: {
    className: `${cssPages.moduleWindow} ${cssChat.moduleWindow_chat}`,
  },
  childrenData: chatChildrenData,
};

export const chatPageRouteConfig: RouteConfigs = {
  path: RouteLink.Chats,
  rootQuery: "#app",
  authStatus: 'protected',
  params: {},
};
