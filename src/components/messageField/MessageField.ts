import { ComponentParams } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IMessageFieldConfigs } from "./messageField.d";
import css from "./messageField.module.css";

export interface MessageFieldProps extends ComponentParams {
  configs: IMessageFieldConfigs;
}

export class MessageField extends Component {
  constructor(props: MessageFieldProps) {
    const domService = new DOMService("div", {
      class: `${css.inputWrap} ${props.configs.class || ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <button type="button" class="${css.inputButton} ${css.attachButton}"></button>
        <input
          class="${css.input}"
          name="{{id}}"
          type="{{type}}"
          id="{{id}}"
          placeholder="{{placeholder}}"
        />
        <button type="submit" class="${css.inputButton} ${css.sendButton}"></button>
      `;
  }
}
