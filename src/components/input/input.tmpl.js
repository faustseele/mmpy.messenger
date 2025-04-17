import Handlebars from "handlebars";
import css from "./input.module.css"

export default function regInput() {
  Handlebars.registerPartial(
    "input",
    /* html */
    `
    {{#each inputData}}
      <div class="${css.inputWrap}">
        <input class="${css.input}" type="{{type}}" id="{{id}}" placeholder="{{label}}" />
      </div>
    {{/each}}
    `
  );
//<label class="${css.inputLabel}" for="{{id}}">{{ label }}</label>
}
