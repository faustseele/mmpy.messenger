import { ComponentParams } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IMessageConfigs } from "./message.d";
import css from "./message.module.css";

export interface MessageProps extends ComponentParams {
  configs: IMessageConfigs;
}

export class Message extends Component {
  constructor(props: MessageProps) {
    const messageClasses = [
      css.message,
      props.configs.__isOutgoing ? css.message_outgoing : "",
      props.configs.__isIncoming ? css.message_incoming : "",
      props.configs.__isDateBubble ? css.message_dateBubble : "",
      props.configs.class || "",
    ]
      .join(" ")
      .trim();

    const domService = new DOMService("article", { class: messageClasses });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{#if __isDateBubble}}
          <p class="${css.dateBubble}">{{__date}}</p>
        {{else}}
          <div class="${css.content}">
            {{#if __text}}
              <p class="${css.content__text}">{{__text}}</p>
            {{/if}}
            {{#if __image}}
              <img class="${css.content__image}" src="{{__image}}" alt="Message __image" />
            {{/if}}
            <p class="${css.content__infoBox}">{{__date}}</p>
          </div>
        {{/if}}
      `;
  }
}
