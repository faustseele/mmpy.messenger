import {
  createButton,
  createCatalogueItem,
  createHeading,
  createInput,
  createMessage,
  createMessageField,
} from "../../services/factory/factory.ts";
import { IChatPageConfigs } from "./chat.d";
import css from "./chat.module.css";

export const createChildren = (configs: IChatPageConfigs) => {
  const {
    headingConfigs_chats,
    headingConfigs_goToProfile,
    buttonProps_delete,
    searchLabel,
    catalogueItemsConfigs,
    messageFieldConfigs,
    messagesConfigs,
  } = configs;

  const children = {
    heading_chats: createHeading({ configs: headingConfigs_chats }),
    heading_goToProfile: createHeading({ configs: headingConfigs_goToProfile }),
    searchInput: createInput({
      configs: {
        id: "search",
        type: "text",
        placeholder: searchLabel,
        class: css.searchInput,
        __label: searchLabel,
        __isSearch: true,
      },
    }),

    catalogueItems: catalogueItemsConfigs.map((itemProps) =>
      createCatalogueItem({
        configs: {
          __title: itemProps.__title,
          __contentText: itemProps.__contentText,
          __date: itemProps.__date,
          __unreadCount: itemProps.__unreadCount,
        },
      }),
    ),
    deleteChatButton: createButton(buttonProps_delete),
    messages: messagesConfigs.map((messageProps) =>
      createMessage({
        configs: {
          __isOutgoing: messageProps.__isOutgoing,
          __isIncoming: messageProps.__isIncoming,
          __isDateBubble: messageProps.__isDateBubble,
          __text: messageProps.__text,
          __image: messageProps.__image,
          __date: messageProps.__date,
        },
      }),
    ),
    messageFieldConfigs: createMessageField({
      configs: {
        id: messageFieldConfigs.id,
        type: messageFieldConfigs.type,
        placeholder: messageFieldConfigs.placeholder,
        __label: messageFieldConfigs.__label,
      },
    }),
  };
  return children;
};
