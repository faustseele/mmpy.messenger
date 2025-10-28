import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { MessageFieldProps } from "../model/types.ts";
import css from "./messageField.module.css";

export class MessageField extends Component<MessageFieldProps> {
  constructor(props: ComponentProps<MessageFieldProps, MessageField>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <button type="button" class="${css.inputButton} ${css.attachButton}" aria-label="Attach file"></button>
      <input
        class="${css.input}"
        name="{{id}}"
        type="{{type}}"
        id="{{id}}"
        placeholder="{{placeholder}}"
        aria-label="{{label}}"
        autocomplete="off"
      />
      <button type="submit" class="${css.inputButton} ${css.sendButton}" aria-label="Send message"></button>
    `;
  }
}
