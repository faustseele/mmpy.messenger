import Component from "@/shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@/shared/lib/Component/model/types.ts";
import css from "./avatar.module.css";
import { AvatarProps } from "./types.ts";

export class Avatar extends Component<AvatarProps> {
  constructor(props: ComponentProps<AvatarProps, Avatar>) {
    super(props);
  }

  public getInnerMarkup(): string {
    return /*html*/ `
      <label for="avatar-input" class="${css.avatarWrap}">
        <img class="${css.avatarWrap__img}" src="{{ src }}" alt="Participant's avatar" />

        {{#if noAvatar }}
          <span class="${css.avatarWrap__letter}"> {{letter}} </span>
        {{/if}}

        {{#if hasInput}}
          <div class="${css.avatarWrap__inputOverlay}">
            <span>🔄</span>
          </div>
        {{/if}}
      </label>
      <input id="avatar-input" type="file" name="avatar" class="${css.avatarFileInput}" />
    `;
  }
}
