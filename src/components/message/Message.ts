import { IComponentData } from "../../framework/Component/Component.d";
import Component, {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import { MessageProps } from "./message.d";
import css from "./message.module.css";

export class Message extends Component<MessageProps> {
  constructor(props: ComponentParams<MessageProps>) {
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
            <img class="${css.content__image}" src="{{image}}" alt="Message image" />
          {{/if}}
          <p class="${css.content__infoBox}">{{date}}</p>
        </div>
      {{/if}}
    `;
  }
}

export const createMessage: IComponentFactory<MessageProps> = (
  data: IComponentData<MessageProps>,
): Message => {
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

  return new Message({ deps, data });
};
