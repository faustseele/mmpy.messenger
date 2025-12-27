import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { MessageProps } from "../model/types.ts";
import css from "./messageBubble.module.css";

export class MessageBubble extends Component<MessageProps> {
  constructor(props: ComponentProps<MessageProps, MessageBubble>) {
    super(props);
  }

  public getSourceMarkup(): string {
    const isDate = this.configs.type === "date";
    return /*html*/ `
      {{#if ${isDate}}}
        <p class="${css.dateBubble}">{{date}}</p>
      {{else}}
        <div class="${css.content}">
          {{#if text}}
            <p class="${css.content__text}">{{text}}</p>
          {{/if}}
          {{#if image}}
            <img class="${css.content__image}" src="{{image}}" alt="MessageBubble image" />
          {{/if}}
          <p class="${css.content__infoBox}">{{date}}</p>
        </div>
      {{/if}}
    `;
  }
}
