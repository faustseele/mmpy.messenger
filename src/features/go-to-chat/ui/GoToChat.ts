import { cx } from "@/shared/lib/helpers/formatting/classnames.ts";
import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { GoToChatConfigs, GoToChatProps } from "../model/types.ts";
import css from "./goToChat.module.css";

export class GoToChat extends Component<GoToChatProps> {
  constructor(props: ComponentProps<GoToChatProps, GoToChat>) {
    super(props);
  }

  public getRootTagCx(configs: GoToChatConfigs): string {
    const isNotes = configs.type === "notes";
    return cx(css.goToChat, isNotes && css.goToChat_note);
  }

  public componentDidMount(): void {
    this.element?.setAttribute("tabindex", "0");
    this.element?.focus();
  }

  public getInnerMarkup(): string {
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
