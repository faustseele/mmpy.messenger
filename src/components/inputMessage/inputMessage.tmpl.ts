import Handlebars from "handlebars";
import css from "./inputMessage.module.css";

export default function regInputMessage() {
  const attachStyle = `background-image: url(../../../static/attach.svg)`;
  const sendStyle = `background-image: url(../../../static/send-msg.svg)`;

  Handlebars.registerPartial(
    "inputMessage",
    /* html */
    `
      <div class="${css.inputWrap}">
        <button type="button" class="${css.inputButton}"
          style="${attachStyle}"></button>

        <input
          class="${css.input} ${css.input_editor}"
          name="{{id}}"
          type="{{type}}"
          id="{{id}}"
          placeholder="{{inputMessageLabel}}"/>

        <button type="submit" class="${css.inputButton}"
          style="${sendStyle}"></button>
      </div>
    `,
  );
}
