import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { GoToChatProps } from "../model/types.ts";
import css from "./goToChat.module.css";

export class GoToChat extends Component<GoToChatProps> {
  constructor(props: ComponentProps<GoToChatProps, GoToChat>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <img class="${css.avatar}" alt="User's avatar from catalogue" src="{{ avatar }}" />

      <div class="${css.goToChat__content}">
        <p class="${css.userName}">{{ userName }}</p>
        {{#if contentText }}
          <p class="${css.contentText}">{{ contentText }}</p>
        {{/if}}
      </div>

      <div class="${css.goToChat__infoBox}">
        <p class="${css.infoBoxText}">{{ date }}</p>
        {{#if unread_count }}
          <p class="${css.infoBoxText} ${css.infoBoxText_unread}">{{ unreadCount }}</p>
        {{/if}}
      </div>
    `;
  }
}
