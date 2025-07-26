import { ComponentProps } from "../../framework/Component/Component.d";
import { IInputConfigs } from "../../utils/input.d";
import css from "./input.module.css";
import { Input } from "./Input.ts";

export interface InputEditorProps extends ComponentProps {
  configs: IInputConfigs;
}

export class InputEditor extends Input {
  constructor(props: InputEditorProps) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <input
          class="${css.input} ${css.input_editor}"
          name="{{id}}"
          type="{{type}}"
          id="{{id}}"
          placeholder="{{placeholder}}"
        />
        <label class="${css.inputEditLabel}" for="{{id}}">{{__label}}</label>
        <span class="${css.errorLabel}"></span>
      `;
  }
}
