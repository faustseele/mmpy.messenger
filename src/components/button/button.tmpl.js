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
      " type="{{type}}">
        <a href="{{link}}" class="newRoute">
          {{label}}
        </a>
      </button>
    {{/each}}
    `
  );
}
