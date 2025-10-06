import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentData, ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { MessageProps } from "../model/types.ts";
import css from "./messageBubble.module.css";

export class MessageBubble extends Component<MessageProps> {
  constructor(props: ComponentProps<MessageProps>) {
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

export const createMessage: ComponentFactory<MessageProps,  MessageBubble> = (
  data: ComponentData<MessageProps>,
): MessageBubble => {
  const messageClasses = [
    css.message,
    data.configs.type === "outgoing" ? css.message_outgoing : "",
    data.configs.type === "incoming" ? css.message_incoming : "",
    data.configs.type === "date" ? css.message_dateBubble : "",
  ]
    /* Cleaning up the array of falsy elements */
    .filter(Boolean)
    .join(" ");

  const attributes = {
    ...data.attributes,
    className: `${data.attributes?.className || ""} ${messageClasses}`.trim(),
  };

  const deps = {
    domService: new DOMService(data.configs.tagName, attributes),
    fragmentService: new FragmentService(),
  };

  return new MessageBubble({ deps, data });
};
