import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { Input } from "@shared/ui/Input/Input.ts";
import css from "@shared/ui/Input/input.module.css";
import { InputProps } from "@shared/ui/Input/types.ts";

export class InputEditor extends Input {
  constructor(props: ComponentProps<InputProps, InputEditor>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
    <span class="${css.labelSpan}">
      {{ label }}
    </span>
      <input
        class="${css.input} ${css.input_editor}"
        name="{{fieldId}}"
        type="{{type}}"
        id="{{fieldId}}"
        placeholder="{{placeholder}}"
        autocomplete="{{autocomplete}}"
      />
      <span class="${css.errorLabel}"></span>
    `;
  }
}
