import { ComponentData } from "../../../framework/Component/component";
import { ComponentParams } from "../../../framework/Component/Component.ts";
import DOMService from "../../../services/render/DOM/DOMService.ts";
import FragmentService from "../../../services/render/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../utils/factory/factory";
import { Input, InputProps } from "./Input.ts"; // 👈 Import the base class and its props
import css from "./input.module.css";

export class InputEditor extends Input {
  constructor(props: ComponentParams<InputProps>) {
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
