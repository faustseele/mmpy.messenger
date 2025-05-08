import Handlebars from "handlebars";
import css from "./message.module.css";

export default function regMessage() {
  Handlebars.registerPartial(
    "message",
    /* html */
    `
    {{#each messageData}}
      <article class="${css.message} 
        {{#if isOutgoing}}${css.message_outgoing}{{/if}}
        {{#if isIncoming}}${css.message_incoming}{{/if}}
        {{#if isDateBubble}}${css.message_dateBubble}{{/if}}">

        {{#if isDateBubble}}
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

      </article>
    {{/each}}
    `,
  );
}
