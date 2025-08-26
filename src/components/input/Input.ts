import {
  BaseProps,
  ComponentData,
} from "../../framework/Component/component";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import { ComponentFactory } from "../../utils/factory/factory.d";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { guardHTMLElement } from "../../utils/guards.ts";
import { InputAttributes, InputConfigs, FieldType } from "../../utils/input.d";
import css from "./input.module.css";

export interface InputProps extends BaseProps {
  configs: InputConfigs;
  attributes?: InputAttributes;
  events?: BaseProps["events"];
  childrenData?: BaseProps["childrenData"];
}

export class Input extends Component<InputProps> {
  private input: HTMLInputElement | undefined = undefined;
  private errorLabel: HTMLElement | undefined = undefined;

  constructor(props: ComponentParams<InputProps>) {
    const { deps, data } = props;

    super({ deps, data });

    this.input = this.element?.querySelector("input") ?? undefined;
    this.errorLabel =
      this.element?.querySelector(`.${css.errorLabel}`) ?? undefined;
  }

  public getNameAndValue(): { name: FieldType | ""; value: string } {
    if (!guardHTMLElement("Input.input", this.input)) {
      return { name: "", value: "" };
    }

    return { name: this.input.name as FieldType, value: this.input.value };
  }

  public showError(message: string): void {
    if (
      !guardHTMLElement("Input.input", this.input) ||
      !guardHTMLElement("Input.errorLabel", this.errorLabel)
    ) {
      return;
    }

    this.errorLabel.textContent = message;
    this.errorLabel.style.display = "block";
    this.input.classList.add("class", css.input_error);
  }

  public hideError(): void {
    if (
      !guardHTMLElement("Input.input", this.input) ||
      !guardHTMLElement("Input.errorLabel", this.errorLabel)
    ) {
      return;
    }

    this.errorLabel.style.display = "none";
    this.input.classList.remove("class", css.input_error);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <input
          class="${css.input} {{#if __isSearch}}${css.input_search} {{/if}}"
          name="{{id}}"
          type="{{type}}"
          id="{{id}}"
          placeholder="{{placeholder}}"
          autocomplete="on"
        />
        <span class="${css.errorLabel}"></span>
      `;
  }
}

export const createInput: ComponentFactory<InputProps> = (
  data: ComponentData<InputProps>,
): Input => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Input({ deps, data });
};
