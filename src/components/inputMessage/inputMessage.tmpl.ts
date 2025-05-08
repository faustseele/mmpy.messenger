import Handlebars from "handlebars";
import css from "./inputMessage.module.css";
import attachIc from "../../../static/attach.svg";
import sendIc from "../../../static/send-msg.svg";

export default function regInputMessage() {
  const attachStyle = `background-image: url(${attachIc})`;
  const sendStyle = `background-image: url(${sendIc})`;

  Handlebars.registerPartial(
    "inputMessage",
    /* html */
    `
      <div class="${css.inputWrap}">
        <button type="button" class="${css.inputButton}"
          style="${attachStyle}" />

        <input
          class="${css.input} ${css.input_editor}"
          name="{{id}}"
          type="{{type}}"
          id="{{id}}"
          placeholder="{{placeholder}}" />

        <button type="submit" class="${css.inputButton}"
          style="${sendStyle}" />
      </div>
    `,
  );
}
