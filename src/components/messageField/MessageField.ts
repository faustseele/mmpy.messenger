import { IComponentData } from "../../framework/Component/Component.d";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import { MessageFieldProps } from "./messageField.d";
import css from "./messageField.module.css";

export class MessageField extends Component<MessageFieldProps> {
  constructor(props: ComponentParams<MessageFieldProps>) {
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

export const createMessageField: IComponentFactory<MessageFieldProps> = (
  data: IComponentData<MessageFieldProps>,
): MessageField => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new MessageField({ deps, data });
};
