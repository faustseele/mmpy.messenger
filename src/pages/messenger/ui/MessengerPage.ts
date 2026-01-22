import { Spinner } from "@/shared/ui/Spinner/Spinner.ts";
import { Page } from "@pages/page/ui/Page.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { Button } from "@shared/ui/Button/Button.ts";
import {
  handleAddChat,
  handleAddNotes,
  handleDeleteChat,
} from "../model/actions.ts";
import { MessengerNodes, MessengerProps } from "../model/types.ts";
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
      addNotesButton,
      findUserChatButton,
      deleteChatButton,
      deleteNotesButton,
    } = this.children.nodes as MessengerNodes;
    const addChat = addNotesButton.runtime?.instance as Button;
    const addUser = findUserChatButton.runtime?.instance as Button;
    const deleteNotes = deleteNotesButton.runtime?.instance as Button;
    const deleteChat = deleteChatButton.runtime?.instance as Button;

    /* --- settings events --- */
    this._wireAddNotes(addChat);
    this._wireAddChat(addUser);
    this._wireDeleteChat(deleteChat);
    this._wireDeleteChat(deleteNotes);
  }

  public componentDidRender(): void {
    /* re-binding avatar change event */
    this._wireAvatar();
  }

  public componentDidUpdate(): void {
    const spinner = this.children?.nodes["spinner"].runtime
      ?.instance as Spinner;

    const isLoadingMessages = this.configs.isLoadingMessages;

    spinner.setProps({
      configs: {
        isOn: isLoadingMessages,
      },
    });
  }

  private _wireAddChat(addUser: Button) {
    if (!this.on.findUser || !this.on.addChatWithUser) {
      console.error("MessengerPage: params.on is bad", this.on);
      return;
    }

    addUser?.setProps({
      on: {
        click: () => handleAddChat(this.on),
      },
    });
  }

  private _wireAddNotes(addNotes: Button) {
    addNotes?.setProps({
      on: {
        click: () => handleAddNotes(this.on),
      },
    });
  }

  private _wireDeleteChat(deleteChat: Button) {
    deleteChat.setProps({
      on: {
        click: (e: Event) => handleDeleteChat(e, this.configs.info, this.on),
      },
    });
  }

  private _wireAvatar(): void {
    const input =
      this.element?.querySelector<HTMLInputElement>("#avatar-input");

    if (!input || input.dataset.bound) return;

    input.addEventListener("change", async () => {
      if (this.configs.info.type === "stub") {
        console.error("MessengerPage: info is stub");
        return;
      }

      const id = this.configs.info.chatId;
      const file = input.files?.[0];

      if (!id || !file) {
        console.error("No active chat to update avatar or bad file");
        return;
      }

      await this.on?.updateChatAvatar?.(id, file);

      input.value = "";
    });
    input.dataset.bound = "true";
  }

  public getInnerMarkup(): string {
    const type = this.configs.info.type;
    const isStub = type === "stub";
    const isNotes = type === "notes";
    const isChat = type === "chat";

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
      spinner,
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
        <header class="${css.chatHeader}">
          <div class="${css.chatHeader__face}">

          {{#if ${isChat || isNotes}}}
            <label for="avatar-input" class="${css.avatarContainer}">
              <img class="${css.avatar}" src="{{ info.chatAvatar }}" alt="Participant's avatar" />
              <div class="${css.avatarOverlay}">
                <span class="${css.overlayText}">🔄</span>
              </div>
            </label>
            <input id="avatar-input" type="file" name="avatar" class="${css.avatarFileInput}" />
            <p class="${css.chatTitle}">{{ info.chatTitle }}</p>
          {{/if}}

          </div>

          <div class="${css.chatHeader__options}">
            {{#if ${isStub}}}
              {{{ ${addNotesButton.params.configs.id} }}}
              {{{ ${findUserChatButton.params.configs.id} }}}
            {{/if}}

            {{#if ${isChat}}}
              {{{ ${deleteChatButton.params.configs.id}}}}
              {{{ ${closeChatButton.params.configs.id} }}}
            {{/if}}

            {{#if ${isNotes}}}
              {{{ ${deleteNotesButton.params.configs.id}}}}
              {{{ ${closeChatButton.params.configs.id} }}}
            {{/if}}
          </div>
        </header>

        <div class="${css.chat__feed}">
          {{#if ${isChat || isNotes}}}
            {{{ ${spinner.params.configs.id} }}}

            {{#if hasMessages}}
              {{{ messages }}}
            {{else}}

              {{#unless isLoadingMessages}}
                <p class="${css.noMessages}">${isNotes ? "Нет заметок" : "Нет сообщений"}</p>
              {{/unless}}
              
            {{/if}}
          {{/if}}
        </div>

        {{#if ${isChat || isNotes}}}
          {{{ ${messageField.params.configs.id} }}}
        {{/if}}
      </main>
    `;
  }
}
