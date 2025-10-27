import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Store from "../../../app/providers/store/Store.ts";
import ChatService from "../../../entities/chat/model/ChatService.ts";
import UserService from "../../../features/edit-profile/model/UserService.ts";
import { MessageField } from "../../../features/send-message/ui/MessageField.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
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

    /* --- api-check 4 chats --- */
    if (!Store.getState().api.chats.list) {
      console.log("MessengerPage: fetching chats");
      ChatService.fetchChats();
    }

    /* --- getting instances --- */
    const {
      heading_goToSettings,
      addChatButton,
      addUserButton,
      deleteChatButton,
      deleteUserButton,
      closeChatButton,
      messageField,
    } = this.children.nodes as MessengerNodes;
    const headingToSettings = heading_goToSettings.runtime?.instance as Heading;
    const addChat = addChatButton.runtime?.instance as Button;
    const addUser = addUserButton.runtime?.instance as Button;
    const closeChat = closeChatButton.runtime?.instance as Button;
    const deleteChat = deleteChatButton.runtime?.instance as Button;
    const deleteUser = deleteUserButton.runtime?.instance as Button;
    const form = messageField.runtime?.instance as MessageField;

    /* --- setting events --- */
    this._wireMessageSubmit(form);
    this._wireAddChat(addChat);
    this._wireAddUser(addUser);
    this._wireDeleteCurrentChat(deleteChat);
    this._wireDeleteUser(deleteUser);
    this._wireCloseChat(closeChat);
    headingToSettings?.setProps({
      on: {
        click: () => Router.go(RouteLink.Settings),
      },
    });
  }

  public componentDidRender(): void {
    /* re-binding avatar change event */
    this._wireAvatar();
  }

  private _wireAddUser(addUser: Button) {
    addUser?.setProps({
      on: {
        click: async () => {
          const input = window.prompt("Логин пользователя:", "");
          if (input === null) return;

          const login = input.trim();
          if (!login) return;

          const chatId = Store.getState().api.chats.activeId;
          if (!chatId) {
            console.error("No active chat to add user into");
            return;
          }

          const user = await UserService.findByLogin(login);
          if (!user) {
            console.error("User not found by login:", login);
            return;
          }

          await ChatService.addUsers(chatId, [user.id]);
          console.log(
            `User ${user.login} (id=${user.id}) added to chat`,
            chatId,
          );
        },
      },
    });
  }

  private _wireAddChat(addChat: Button) {
    addChat?.setProps({
      on: {
        click: () => {
          const input = window.prompt("Название чата:", "");
          if (input === null) return;

          const title = input.trim();
          if (!title) return;

          ChatService.createChat(title);
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

  private _wireDeleteUser(deleteUser: Button) {
    deleteUser?.setProps({
      on: {
        click: async (e: Event) => {
          e.preventDefault();

          const chatId = Store.getState().api.chats.activeId;
          if (!chatId) {
            console.error("No active chat to remove user from");
            return;
          }

          const usersInChat = (await ChatService.getUsers(chatId)).filter(
            (user) => user.id !== Store.getState().api.auth.user?.id,
          );

          const usersString = usersInChat
            .map((user) => `• ${user.login} – id: ${user.id}`)
            .join("\n");

          console.log(usersInChat);

          const userId = window.prompt(`Кого удалить?\n\n${usersString}`, "");
          if (!userId || isNaN(Number(userId))) return;

          await ChatService.removeUsers(chatId, [Number(userId)]);
          console.log(`User ${userId} removed from chat ${chatId}`);
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

  private _wireAvatar(): void {
    const input =
      this.element?.querySelector<HTMLInputElement>("#avatar-input-chat");

    if (!input || input.dataset.bound) return;

    input.addEventListener("change", async () => {
      const id = Store.getState().api.chats.activeId;

      if (!id) {
        console.error("No active chat to update avatar");
        return;
      }

      const file = input.files?.[0];

      if (!file) return;
      await ChatService.updateChatAvatar(id, file);
      input.value = "";
    });
    input.dataset.bound = "true";
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
      addChatButton,
      addUserButton,
      closeChatButton,
      deleteChatButton,
      deleteUserButton,
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

          {{#if participantName}}
            <label for="avatar-input-chat" class="${css.avatarContainer}">
              <img class="${css.avatar}" src="{{ participantAvatar }}" alt="Participant avatar"  />
              <div class="${css.avatarOverlay}">
                <span class="${css.overlayText}">🔄</span>
              </div>
            </label>
            <input id="avatar-input-chat" type="file" name="avatar" class="${css.avatarFileInput}" />
            {{/if}}

            <p class="${css.chatParticipant__name}">{{ participantName }}</p>
          </div>

          <div class="${css.chatOptions}">
            {{~#if participantName}}
              {{{ ${addUserButton.params.configs.id} }}}
              {{{ ${deleteUserButton.params.configs.id} }}}
              {{{ ${deleteChatButton.params.configs.id} }}}
              {{{ ${closeChatButton.params.configs.id} }}}
            {{~else}}
              {{{ ${addChatButton.params.configs.id} }}}
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
