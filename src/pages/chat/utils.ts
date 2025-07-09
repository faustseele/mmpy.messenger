import {
  createButton,
  createCatalogueItem,
  createHeading,
  createInput,
  createMessage,
  createMessageField,
} from "../../utils/componentFactory.ts";
import { IChatPageData } from "./chat.d";
import css from "./chat.module.css";

export const createChildren = (configs: IChatPageData) => {
  const {
    headingData_chats,
    headingData_goToProfile,
    buttonData_delete,
    searchLabel,
    catalogueItemsData,
    messageField,
    messagesData,
  } = configs;

  const children = {
    heading_chats: createHeading({ configs: headingData_chats }),
    heading_goToProfile: createHeading({ configs: headingData_goToProfile }),
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

    catalogueItems: catalogueItemsData.map((itemProps) =>
      createCatalogueItem({
        configs: {
          __title: itemProps.__title,
          __contentText: itemProps.__contentText,
          __date: itemProps.__date,
          __unreadCount: itemProps.__unreadCount,
        },
      }),
    ),
    deleteChatButton: createButton(buttonData_delete),
    messages: messagesData.map((messageProps) =>
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
    messageField: createMessageField({
      configs: {
        id: messageField.id,
        type: messageField.type,
        placeholder: messageField.placeholder,
        __label: messageField.__label,
      },
    }),
  };
  return children;
};
