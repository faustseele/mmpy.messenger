import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { handleSendMessage } from "../model/actions.ts";
import { MessageFieldProps } from "../model/types.ts";
import css from "./messageField.module.css";

export class MessageField extends Component<MessageFieldProps> {
  constructor(props: ComponentProps<MessageFieldProps, MessageField>) {
    super(props);
  }

  public componentDidMount(): void {
    this.setProps({
      on: {
        submit: (e: Event) => {
          e.preventDefault();

          const el = e.target as HTMLFormElement;
          const input = el.querySelector("input");
          const text = (input as HTMLInputElement)?.value?.trim();

          if (text) {
            handleSendMessage(text);
            (input as HTMLInputElement).value = "";
          }
        },
      },
    });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
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
