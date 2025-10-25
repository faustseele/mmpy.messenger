import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Store from "../../../app/providers/store/Store.ts";
import ChatService from "../../../entities/chat/model/ChatService.ts";
import { GoToChatProps } from "../../../features/go-to-chat/model/types.ts";
import { GoToChat } from "../../../features/go-to-chat/ui/GoToChat.ts";
import { MessageField } from "../../../features/send-message/ui/MessageField.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { getInstances } from "../../../shared/lib/helpers/factory/functions.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { Page } from "../../page/ui/Page.ts";
import { MessengerNodes, MessengerProps } from "../model/types.ts";
import css from "./messenger.module.css";

export class MessengerPage extends Page<MessengerProps> {
  constructor(props: ComponentProps<MessengerProps, MessengerPage>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!this.children?.nodes) {
      throw new Error("MessengerPage: Children are not defined");
    }

    /* --- getting instances --- */
    const { heading_goToSettings, deleteChatButton, messageField } = this
      .children.nodes as MessengerNodes;
    const headingToSettings = heading_goToSettings.runtime?.instance as Heading;
    const deleteChat = deleteChatButton.runtime?.instance as Button;
    const form = messageField.runtime?.instance as MessageField;

    /* --- setting events --- */
    this._wireDeleteCurrentChat(deleteChat);
    this._wireMessageSubmit(form);
    headingToSettings?.setProps({
      on: {
        click: () => Router.go(RouteLink.Settings),
      },
    });
    this._wireCatalogueClicks();

    /* --- api-check --- */
    if (!Store.getState().api.chats.list) ChatService.fetchChats();
  }

  private _wireMessageSubmit(form: MessageField) {
    form?.setProps({
      on: {
        submit: (e: Event) => {
          e.preventDefault();

          const el = e.target as HTMLFormElement;
          const input = el.querySelector("input");
          const text = (input as HTMLInputElement)?.value?.trim();

          if (text) {
            ChatService.sendMessage(text);
            (input as HTMLInputElement).value = "";
          }
        },
      },
    });
  }

  private _wireDeleteCurrentChat(deleteChat: Button) {
    deleteChat.setProps({
      on: {
        click: async (e: Event) => {
          e.preventDefault();

          const id = Store.getState().api.chats.activeId;
          if (id) await ChatService.deleteChat(id);
        },
      },
    });
  }

  private _wireCatalogueClicks() {
    const goTos = getInstances<GoToChatProps, GoToChat>(
      this.children!,
      "goToChatItems",
    );
    goTos.forEach((goTo) => {
      const chatId = (goTo.configs as { chat_id?: number }).chat_id;

      if (!chatId) return;

      goTo.setProps({ on: { click: () => ChatService.selectChat(chatId) } });
    });

    this.bus.on("flow:render", this._wireCatalogueClicks.bind(this));
  }

  public getSourceMarkup(): string {
    if (!this.children?.nodes)
      return /*html*/ `<span>ERROR: MessengerPage: Children are not defined</span>`;

    const {
      heading_chats,
      heading_goToSettings,
      searchInput,
      deleteChatButton,
      messageField,
    } = this.children.nodes as MessengerNodes;

    return /*html*/ `
      <aside class="${css.catalogue}">
      
        <header class="${css.catalogue__head}">
          <div class="${css.catalogue__headings}">
            {{{ ${heading_chats.params.configs.id} }}}
            {{{ ${heading_goToSettings.params.configs.id} }}}
          </div>
          {{{ ${searchInput.params.configs.id} }}}
        </header>

        <ul class="${css.catalogue__items}">
          {{{ goToChatItems }}}
        </ul>
      </aside>

      <main class="${css.chat}">
        <header class="${css.chat__header}">
          <div class="${css.chatParticipant}">
            <img class="${css.chatParticipant__avatar}" src="{{ participantAvatar }}" alt="Participant avatar"/>
            <p class="${css.chatParticipant__name}">{{ participantName }}</p>
          </div>
          <div class="${css.chatOptions}">
            {{{ ${deleteChatButton.params.configs.id} }}}
            <button type="button" class="${css.chatOptions__button}"></button>
          </div>
        </header>

        <div class="${css.chat__feed}">
          {{{ messages }}}
        </div>

        {{{ ${messageField.params.configs.id} }}}
      </main>
    `;
  }
}
