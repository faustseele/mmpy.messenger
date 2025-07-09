import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import {
  createButton,
  createCatalogueItem,
  createHeading,
  createInput,
  createMessage,
  createMessageField,
} from "../../utils/componentFactory.ts";
import pagesCss from "../pages.module.css";
import { IChatPageData } from "./chat.d";
import css from "./chat.module.css";

export interface ChatPageProps extends ComponentProps {
  configs: IChatPageData;
}

export class ChatPage extends Component {
  constructor(props: ChatPageProps) {
    const { configs } = props;
    const {
      headingData,
      buttonData,
      searchLabel,
      chatData,
      catalogueItemData,
      messageField,
      messageData,
    } = configs;

    const children = {
      headings: headingData.map((headingProps) =>
        createHeading({ configs: { ...headingProps } }),
      ),
      searchInput: [
        createInput({
          configs: {
            id: "search",
            type: "text",
            placeholder: searchLabel,
            class: css.searchInput,
            __label: searchLabel,
            __isSearch: true,
          },
        }),
      ],
      catalogueItems: catalogueItemData.map((itemProps) =>
        createCatalogueItem({
          configs: {
            __title: itemProps.__title,
            __contentText: itemProps.__contentText,
            __date: itemProps.__date,
            __unreadCount: itemProps.__unreadCount,
          },
        }),
      ),
      deleteChatButton: buttonData.map((buttonProps) =>
        createButton({
          configs: {
            type: buttonProps.type,
            __label: buttonProps.__label,
            __type: buttonProps.type,
            __isSilent: buttonProps.__isSilent,
            __link: buttonProps.__link,
          },
        }),
      ),
      messages: messageData.map((messageProps) =>
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
      messageField: [
        createMessageField({
          configs: {
            id: messageField.id,
            type: messageField.type,
            placeholder: messageField.placeholder,
            __label: messageField.__label,
          },
        }),
      ],
    };

    const domService = new DOMService("div", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_chat}`,
    });
    const fragmentService = new FragmentService();

    const pageConfigs = {
      participantAvatar: chatData.participantAvatar,
      participantName: chatData.__participantName,
    };

    super({ configs: pageConfigs }, children, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <div class="${css.catalogue}">
          <header class="${css.catalogue__head}">

            <div class="${css.catalogue__headings}">
              {{{ headings }}}
            </div>

            {{{ searchInput }}}
            
          </header>

          <div class="${css.catalogue__items}">
            {{{ catalogueItems }}}
          </div>
        </div>

        <main class="${css.chat}">

          <header class="${css.chat__header}">
            <div class="${css.chatParticipant}">
              <img class="${css.chatParticipant__avatar}" src="{{ participantAvatar }}"/>
              <p class="${css.chatParticipant__name}">{{ participantName }}</p>
            </div>

            <div class="${css.chatOptions}">

              {{{ deleteChatButton }}}

              <button type="button" class="${css.chatOptions__button}"></button>
            </div>
          </header>

          <div class="${css.chat__feed}">
            {{{ messages }}}
          </div>

          {{{ messageField }}}
        </main>
      `;
  }
}
