import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentProps, ComponentData } from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { MessageFieldProps } from "../model/types.ts";
import css from "./messageField.module.css";

export class MessageField extends Component<MessageFieldProps> {
  constructor(props: ComponentProps<MessageFieldProps>) {
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
      />
      <button type="submit" class="${css.inputButton} ${css.sendButton}" aria-label="Send message"></button>
    `;
  }
}

export const createMessageField: ComponentFactory<MessageFieldProps, MessageField> = (
  data: ComponentData<MessageFieldProps>,
): MessageField => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new MessageField({ deps, data });
};
