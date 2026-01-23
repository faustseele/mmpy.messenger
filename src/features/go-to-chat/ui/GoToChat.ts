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
    const { type, selected } = configs;
    const isNotes = type === "notes";
    return cx(
      css.goToChat,
      isNotes && css.goToChat_note,
      selected && css.goToChat_selected,
    );
  }

  public componentDidMount(): void {
    this.element?.setAttribute("tabindex", "0");
    this.element?.focus();
  }

  public getInnerMarkup(): string {
    const noAvatar = this.configs.avatar === "/static/avatar.png";
    const letter = this.configs.userName.charAt(0);

    return /*html*/ `
      <div class="${css.avatarWrap}">
        <img class="${css.avatarWrap_img}" alt="User's avatar from catalogue" src="{{ avatar }}">
        {{#if ${noAvatar} }}
          <span class="${css.avatarWrap_letter}"> ${letter} </span>
        {{/if}}
      </div>

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
