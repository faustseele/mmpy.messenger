import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Store from "../../../app/providers/store/Store.ts";
import ChatService from "../../../entities/chat/model/ChatService.ts";
import { MessageField } from "../../../features/send-message/ui/MessageField.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { Input } from "../../../shared/ui/Input/Input.ts";
import { Page } from "../../page/ui/Page.ts";
import { MessengerNodes, MessengerProps } from "../model/types.ts";
import { getNewChatPlaceholder } from "../model/utils.ts";
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

    /* --- api-check 4 chats --- */
    if (!Store.getState().api.chats.list) {
      console.log("MessengerPage: fetching chats");
      ChatService.fetchChats();
    }

    /* --- getting instances --- */
    const {
      heading_goToSettings,
      addChatButton,
      newChatInput,
      deleteChatButton,
      closeChatButton,
      messageField,
    } = this.children.nodes as MessengerNodes;
    const headingToSettings = heading_goToSettings.runtime?.instance as Heading;
    const addChat = addChatButton.runtime?.instance as Button;
    const input = newChatInput.runtime?.instance as Input;
    const deleteChat = deleteChatButton.runtime?.instance as Button;
    const closeChat = closeChatButton.runtime?.instance as Button;
    const form = messageField.runtime?.instance as MessageField;

    /* --- setting events --- */
    this._wireMessageSubmit(form);
    this._wireAddChat(addChat, input);
    this._wireDeleteCurrentChat(deleteChat);
    this._wireCloseChat(closeChat);
    headingToSettings?.setProps({
      on: {
        click: () => Router.go(RouteLink.Settings),
      },
    });
  }

  private _wireAddChat(addChat: Button, input: Input) {
    addChat?.setProps({
      on: {
        click: () => {
          const { value } = input.getNameAndValue();
          const title = value ? value : input.configs.placeholder;

          ChatService.createChat(title);

          input.cleanInput()
          input.setProps({ configs: { placeholder: getNewChatPlaceholder() }})
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

  private _wireCloseChat(closeChat: Button) {
    closeChat?.setProps({
      on: {
        click: async () => {
          ChatService.deselectChat();
        },
      },
    });
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

  public getSourceMarkup(): string {
    if (!this.children?.nodes)
      return /*html*/ `<span>ERROR: MessengerPage: Children are not defined</span>`;

    const {
      heading_chats,
      heading_goToSettings,
      searchInput,
      deleteChatButton,
      closeChatButton,
      addChatButton,
      newChatInput,
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
            {{#if participantAvatar}}
              <img class="${css.chatParticipant__avatar}" src="{{ participantAvatar }}" alt="Participant avatar"/>
            {{/if}}
            <p class="${css.chatParticipant__name}">{{ participantName }}</p>
          </div>

          <div class="${css.chatOptions}">
            {{~#if participantName}}
                {{{ ${deleteChatButton.params.configs.id} }}}
                {{{ ${closeChatButton.params.configs.id} }}}
            {{~else}}
              {{{ ${addChatButton.params.configs.id} }}}
              {{{ ${newChatInput.params.configs.id} }}}
            {{/if}}
          </div>
        </header>

        <div class="${css.chat__feed}">
          {{#if participantName}}
            {{{ messages }}}
          {{/if}}
        </div>

        {{#if participantName}}
          {{{ ${messageField.params.configs.id} }}}
        {{/if}}
      </main>
    `;
  }
}
