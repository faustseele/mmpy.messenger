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

      <div class="${css.catalogueItem__content}">
        <p class="${css.userName}">{{ last_message.user.first_name }}</p>
        <p class="${css.contentText}">{{ last_message.content }}</p>
      </div>

      <div class="${css.catalogueItem__infoBox}">
        <p class="${css.infoBoxText}">{{ last_message.time }}</p>
        {{#if unread_count }}
          <p class="${css.infoBoxText} ${css.infoBoxText_unread}">{{ unread_count }}</p>
        {{/if}}
      </div>
    `;
  }
}
