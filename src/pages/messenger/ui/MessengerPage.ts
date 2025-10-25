import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
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

    /* --- getting instances --- */
    const { heading_goToSettings, deleteChatButton } = this.children
      .nodes as MessengerNodes;

    const headingToSettings = heading_goToSettings.runtime?.instance as Heading;
    const deleteButton = deleteChatButton.runtime?.instance as Button;

    /* --- setting events --- */
    headingToSettings?.setProps({
      on: {
        click: () => Router.go(RouteLink.Settings),
      },
    });
    deleteButton?.setProps({
      on: {
        click: () => {
          Router.go(RouteLink.NotFound);
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
