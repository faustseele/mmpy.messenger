import Handlebars from "handlebars";
import css from "./button.module.css"

export default function regButton() {
  Handlebars.registerPartial(
    "button",
    /* html */
    `
    {{#each buttonData}}
      <button class="${css.button}
        {{#if isSilent}}
          ${css.button_silent}
        {{/if}}
      " type="{{type}}">{{label}}</button>
    {{/each}}
    `
  );
}