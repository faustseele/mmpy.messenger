import Router from "@app/providers/router/Router.ts";
import { Page } from "@pages/page/ui/Page.ts";
import { API_URL_RESOURCES } from "@shared/config/urls.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { urlToFile } from "@shared/lib/helpers/file.ts";
import { RouteLink } from "@shared/types/universal.ts";
import { Button } from "@shared/ui/Button/Button.ts";
import { Heading } from "@shared/ui/Heading/Heading.ts";
import {
  handleAddChatWithUser,
  handleAddNotes,
  handleAddUsers,
  handleCloseChat,
  handleDeleteChat,
  handleFindUser,
  handleUpdateChatAvatar,
} from "../model/actions.ts";
import { MessengerNodes, MessengerProps } from "../model/types.ts";
import { randomNoteLabel } from "../model/utils.ts";
import css from "./messenger.module.css";

export class MessengerPage extends Page<MessengerProps> {
  constructor(props: ComponentProps<MessengerProps, MessengerPage>) {
    super(props);
  }

  public componentDidMount(): void {
    if (!this.children?.nodes) {
      throw new Error("MessengerPage: Children are not defined");
    }

    /* --- getting instances --- */
    const {
      heading_goToSettings,
      addNotesButton,
      findUserChatButton,
      deleteChatButton,
      deleteNotesButton,
      closeChatButton,
    } = this.children.nodes as MessengerNodes;
    const headingToSettings = heading_goToSettings.runtime?.instance as Heading;
    const addChat = addNotesButton.runtime?.instance as Button;
    const addUser = findUserChatButton.runtime?.instance as Button;
    const closeChat = closeChatButton.runtime?.instance as Button;
    const deleteNotes = deleteNotesButton.runtime?.instance as Button;
    const deleteChat = deleteChatButton.runtime?.instance as Button;

    /* --- setting events --- */
    this._wireAddNotes(addChat);
    this._wireAddChat(addUser);
    this._wireDeleteChat(deleteChat);
    this._wireDeleteChat(deleteNotes);
    this._wireCloseChat(closeChat);
    headingToSettings.setProps({
      on: {
        click: () =>
          Router.go(headingToSettings.configs.link ?? RouteLink.Settings),
      },
    });
  }

  public componentDidRender(): void {
    /* re-binding avatar change event */
    this._wireAvatar();
  }

  private _wireAddChat(addUser: Button) {
    addUser?.setProps({
      on: {
        click: async () => {
          const explanation = `Логин пользователя:\n\n Доступные сейчас: \n• emil\n• LevTolstoy\n• yandex\n• LeUser\n• mishima\n• tolkien\n• baudrillard\n• foucault\n• shakespear`;

          const input = window.prompt(explanation, "");
          if (input === null) return;

          const login = input.trim();
          if (!login) return;

          const user = await handleFindUser(login);
          if (!user) {
            console.error("User not found by login:", login);
            return;
          }

          const newChatRes = await handleAddChatWithUser(
            user.first_name,
            user.second_name,
          );

          if (!newChatRes) {
            console.error("Chat create failed");
            return;
          }

          await handleAddUsers(newChatRes.id, [user.id]);

          if (user.avatar) {
            const avatar = await urlToFile(
              `${API_URL_RESOURCES}${user.avatar}`,
            );
            handleUpdateChatAvatar(newChatRes.id, avatar);
          }

          console.log(
            `User ${user.login} (id=${user.id}) added to chat`,
            newChatRes.id,
          );
        },
      },
    });
  }

  private _wireAddNotes(addChat: Button) {
    addChat?.setProps({
      on: {
        click: () => {
          const chatName = randomNoteLabel();
          const input = window.prompt("Как назовём заметки?", chatName);
          if (input === null) return;

          const title = input.trim();
          if (!title) return;

          handleAddNotes(title);
        },
      },
    });
  }

  private _wireDeleteChat(deleteChat: Button) {
    deleteChat.setProps({
      on: {
        click: async (e: Event) => {
          e.preventDefault();

          const confirm = window.confirm(
            `Вы уверены, что хотите удалить ${this.configs.chatTitle}?`,
          );
          if (!confirm) return;

          const id = this.configs.chatId;

          if (id) handleDeleteChat(id);
        },
      },
    });
  }

  private _wireCloseChat(closeChat: Button) {
    closeChat?.setProps({
      on: {
        click: () => {
          handleCloseChat();
        },
      },
    });
  }

  private _wireAvatar(): void {
    const input =
      this.element?.querySelector<HTMLInputElement>("#avatar-input-chat");

    if (!input || input.dataset.bound) return;

    input.addEventListener("change", async () => {
      const id = this.configs.chatId;

      if (!id) {
        console.error("No active chat to update avatar");
        return;
      }

      const file = input.files?.[0];

      if (!file) return;
      await handleUpdateChatAvatar(id, file);
      input.value = "";
    });
    input.dataset.bound = "true";
  }

  public getSourceMarkup(): string {
    const isNotes = this.configs.isNotes;

    if (!this.children?.nodes)
      return /*html*/ `<span>ERROR: MessengerPage: Children are not defined</span>`;

    const {
      heading_chats,
      heading_goToSettings,
      addNotesButton,
      findUserChatButton,
      closeChatButton,
      deleteNotesButton,
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
              {{{ ${isNotes ? deleteNotesButton.params.configs.id : deleteChatButton.params.configs.id}}}}
              {{{ ${closeChatButton.params.configs.id} }}}
            {{~else}}
              {{{ ${addNotesButton.params.configs.id} }}}
              {{{ ${findUserChatButton.params.configs.id} }}}
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
