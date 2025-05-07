import Handlebars from "handlebars";
import css from "./input.module.css";

export default function regInputEditor() {
  Handlebars.registerPartial(
    "inputEditor",
    /* html */
    `
    {{#each inputEditorData}}
      <div class="${css.inputWrap}">
        <input class="${css.input} ${css.input_profileEdit}" name="{{id}}" type="{{type}}" id="{{id}}" placeholder="{{placeholder}}" />
        <label class="${css.inputEditLabel}" for="{{id}}">{{label}}</label>
      </div>
    {{/each}}
    `
  );
}
