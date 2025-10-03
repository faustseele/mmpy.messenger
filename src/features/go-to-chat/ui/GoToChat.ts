import Component from "../../../shared/lib/Component/model/Component.ts";
import {
  ComponentProps,
  ComponentData,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { GoToChatProps } from "../model/types.ts";
import css from "./goToChat.module.css";

export class GoToChat extends Component<GoToChatProps> {
  constructor(props: ComponentProps<GoToChatProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <img class="${css.avatar}" alt="User's avatar from catalogue" src="{{avatar}}" />

      <div class="${css.catalogueItem__content}">
        <p class="${css.userName}">{{title}}</p>
        <p class="${css.contentText}">{{contentText}}</p>
      </div>

      <div class="${css.catalogueItem__infoBox}">
        <p class="${css.infoBoxText}">{{date}}</p>
        {{#if unreadCount}}
          <p class="${css.infoBoxText} ${css.infoBoxText_unread}">{{unreadCount}}</p>
        {{/if}}
      </div>
    `;
  }
}

export const createGoToChat: ComponentFactory<GoToChatProps> = (
  data: ComponentData<GoToChatProps>,
): GoToChat => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new GoToChat({ deps, data });
};
