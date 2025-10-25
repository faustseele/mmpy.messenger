import participantAvatar from "../../../../static/avatar.png";
import sunsetImage from "../../../../static/sunset.jpeg";
import {
  RouteConfigs,
  RouteLink,
} from "../../../app/providers/router/types.ts";
import { MessageProps } from "../../../entities/message-bubble/model/types.ts";
import {
  MessageBubble,
  createMessage,
} from "../../../entities/message-bubble/ui/MessageBubble.ts";
import { GoToChatProps } from "../../../features/go-to-chat/model/types.ts";
import catalogueCss from "../../../features/go-to-chat/ui/goToChat.module.css";
import {
  GoToChat,
  buildGoToChat,
} from "../../../features/go-to-chat/ui/GoToChat.ts";
import { MessageFieldProps } from "../../../features/send-message/model/types.ts";
import messageFieldCss from "../../../features/send-message/ui/messageField.module.css";
import {
  MessageField,
  createMessageField,
} from "../../../features/send-message/ui/MessageField.ts";
import {
  MessengerMap,
  MessengerProps,
  MessengerSchema,
} from "../../../pages/messenger/model/types.ts";
import cssChat from "../../../pages/messenger/ui/messenger.module.css";
import cssPage from "../../../pages/page/ui/page.module.css";
import {
  ComponentData,
  ComponentInit,
} from "../../lib/Component/model/types.ts";
import cssBtn from "../../ui/Button/button.module.css";
import { Button, } from "../../ui/Button/Button.ts";
import { ButtonProps } from "../../ui/Button/types.ts";
import { buildButton } from "../../ui/Button/utils.ts";
import cssHeading from "../../ui/Heading/heading.module.css";
import { Heading, } from "../../ui/Heading/Heading.ts";
import { HeadingProps } from "../../ui/Heading/types.ts";
import { buildHeading } from "../../ui/Heading/utils.ts";
import { Input, buildInput } from "../../ui/Input/Input.ts";
import { InputProps } from "../../ui/Input/types.ts";

/* Type guards */
type HeadingInit = ComponentInit<HeadingProps>;
type ButtonInit = ComponentInit<ButtonProps>;
type InputInit = ComponentInit<InputProps>;
type GoToChatInit = ComponentInit<GoToChatProps>;
type MessageInit = ComponentInit<MessageProps>;
type MessageFieldInit = ComponentInit<MessageFieldProps>;

type HeadingConfigs = HeadingProps["configs"];
type ButtonConfigs = ButtonProps["configs"];
type InputConfigs = InputProps["configs"];
type GoToChatConfigs = GoToChatProps["configs"];
type MessageConfigs = MessageProps["configs"];
type MessageFieldConfigs = MessageFieldProps["configs"];

const headingInstance = null as unknown as Heading;
const buttonInstance = null as unknown as Button;
const inputInstance = null as unknown as Input;
const messageFieldInstance = null as unknown as MessageField;
const messageBubbleListInstance = [] as MessageBubble[];
const goToChatListInstance = [] as GoToChat[];

const makeHeadingInit = (
  configs: HeadingConfigs,
  className: string,
): HeadingInit => ({
  configs: { ...configs },
  attributes: {
    className,
  },
});

const makeButtonInit = (
  configs: ButtonConfigs,
  className: string,
): ButtonInit => ({
  configs: { ...configs },
  attributes: {
    type: configs.type,
    className,
  },
});

const makeInputInit = (
  configs: InputConfigs,
  className: string,
): InputInit => ({
  configs: { ...configs },
  attributes: {
    className,
    for: configs.id,
  },
});

const makeGoToChatInit = (
  configs: GoToChatConfigs,
  className: string,
): GoToChatInit => ({
  configs: { ...configs },
  attributes: {
    className,
  },
});

const makeMessageInit = (
  configs: MessageConfigs,
  attributes?: MessageProps["attributes"],
): MessageInit => ({
  configs: { ...configs },
  ...(attributes ? { attributes } : {}),
});

const makeMessageFieldInit = (
  configs: MessageFieldConfigs,
  className: string,
): MessageFieldInit => ({
  configs: { ...configs },
  attributes: {
    className,
  },
});

const chatMessagesInit: MessageInit[] = [
  makeMessageInit({
    tagName: "article",
    type: "incoming",
    text: "Привет! Как дела?",
    date: "10:25",
  }),
  makeMessageInit({
    tagName: "article",
    type: "outgoing",
    text: "Привет, Андрей! Всё отлично, а у тебя?",
    date: "10:26",
  }),
  makeMessageInit({
    tagName: "div",
    type: "date",
    date: "Сегодня, 12:00",
  }),
  makeMessageInit({
    tagName: "article",
    type: "incoming",
    text: "Посмотри, какой закат!",
    image: sunsetImage,
    date: "12:05",
  }),
  makeMessageInit({
    tagName: "article",
    type: "incoming",
    text: "Пойдём вечером гулять?",
    date: "12:07",
  }),
  makeMessageInit({
    tagName: "article",
    type: "outgoing",
    text: "Да, давай! Во сколько?",
    date: "12:08",
  }),
  makeMessageInit({
    tagName: "article",
    type: "incoming",
    text: "О, вечер — время, когда улицы шепчут тайны, а фонари отбрасывают тени, длинные, как мысли Одиссея. В семь, у старого дуба?",
    date: "12:10",
  }),
  makeMessageInit({
    tagName: "article",
    type: "outgoing",
    text: "Семь — час, когда мир затихает, и душа, как река, течёт к тому дубу, где мы встретимся. Буду там, с сердцем, полным слов.",
    date: "12:12",
  }),
  makeMessageInit({
    tagName: "article",
    type: "incoming",
    text: "Ты всегда так говоришь, будто пишешь книгу! Но мне нравится. Принеси свой смех, он ярче звёзд.",
    date: "12:15",
  }),
  makeMessageInit({
    tagName: "article",
    type: "outgoing",
    text: "Мой смех — лишь эхо твоего, отражённое в зеркале ночи. До встречи, о звезда моя!",
    date: "12:17",
  }),
];

const chatCatalogueInit: GoToChatInit[] = [
  makeGoToChatInit(
    {
      tagName: "li",
      title: "Андрей",
      contentText: "Привет, я Андрей! Чат с Андреем для тестов",
      date: "10 мин",
      unreadCount: "2",
      avatar: participantAvatar,
    },
    catalogueCss.goToChat,
  ),
  makeGoToChatInit(
    {
      tagName: "li",
      title: "Вася",
      contentText: "Я Вася, сейчас я напишу это сообщение со всех аккаунтов",
      date: "15:44",
      unreadCount: "1",
      avatar: participantAvatar,
    },
    catalogueCss.goToChat,
  ),
];

const chatSchema: MessengerSchema = {
  singles: {
    heading_chats: {
      init: makeHeadingInit(
        {
          tagName: "h1",
          type: "catalogue-title",
          text: "Чаты 👥",
        },
        cssHeading.heading,
      ),
      factory: buildHeading,
      instanceType: headingInstance,
    },
    heading_goToSettings: {
      init: makeHeadingInit(
        {
          tagName: "h1",
          type: "catalogue-link",
          text: "Профиль ➛",
          isClickable: true,
          link: RouteLink.Settings,
        },
        `${cssHeading.heading} ${cssHeading.heading__text_clickable}`,
      ),
      factory: buildHeading,
      instanceType: headingInstance,
    },
    searchInput: {
      init: makeInputInit(
        {
          tagName: "label",
          label: "Поиск",
          type: "text",
          isError: false,
          isSearch: true,
          name: "search",
          id: "search",
          errorMessage: "",
          placeholder: "Поиск",
        },
        cssChat.searchInput,
      ),
      factory: buildInput,
      instanceType: inputInstance,
    },
    deleteChatButton: {
      init: makeButtonInit(
        {
          label: "Удалить чат",
          tagName: "button",
          type: "button",
          link: RouteLink.NotFound,
        },
        `${cssBtn.button} ${cssBtn.button_silent}`,
      ),
      factory: buildButton,
      instanceType: buttonInstance,
    },
    messageField: {
      init: makeMessageFieldInit(
        {
          tagName: "form",
          id: "message",
          type: "text",
          placeholder: "Сообщение",
          label: "Сообщение",
        },
        messageFieldCss.inputLabelWrap,
      ),
      factory: createMessageField,
      instanceType: messageFieldInstance,
    },
  },
  lists: {
    messages: {
      init: chatMessagesInit,
      factory: createMessage,
      instanceType: messageBubbleListInstance,
    },
    catalogueItems: {
      init: chatCatalogueInit,
      factory: buildGoToChat,
      instanceType: goToChatListInstance,
    },
  },
};

export const chatPageData: ComponentData<MessengerProps, MessengerMap, MessengerSchema> = {
  configs: {
    tagName: "div",
    participantAvatar,
    participantName: "Андрей",
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssChat.moduleWindow_messenger}`,
  },
  childrenSchema: chatSchema,
};

export const chatPageRouteConfig: RouteConfigs = {
  path: RouteLink.Messenger,
  rootQuery: "#app",
  authStatus: "protected",
  params: {},
};
