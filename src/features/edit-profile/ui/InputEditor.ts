import { ComponentProps } from "../../../shared/lib/Component/model/Component.ts";
import { ComponentData } from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { Input, InputProps } from "../../../shared/ui/Input/Input.ts";
import css from "./input.module.css";

export class InputEditor extends Input {
  constructor(props: ComponentProps<InputProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
    <span class="${css.labelSpan}">
      {{label}}
    </span>
      <input
        class="${css.input} ${css.input_editor}"
        name="{{id}}"
        type="{{type}}"
        id="{{id}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        autocomplete="on"
      />
      <span class="${css.errorLabel}"></span>
    `;
  }
}

export const createInputEditor: ComponentFactory<InputProps> = (
  data: ComponentData<InputProps>,
): InputEditor => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new InputEditor({ deps, data });
};
