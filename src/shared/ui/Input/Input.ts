import { BaseProps } from "../../lib/Component/model/base.types.ts";
import Component from "../../lib/Component/model/Component.ts";
import { ComponentData, ComponentProps } from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { guardHTMLElement } from "../../lib/helpers/html/guards.ts";
import { FieldType, InputAttributes, InputConfigs } from "./types.ts";
import css from "./input.module.css";

export interface InputProps extends BaseProps {
  configs: InputConfigs;
  attributes?: InputAttributes;
  events?: BaseProps["events"];
}

export class Input extends Component<InputProps> {
  private input: HTMLInputElement | undefined = undefined;
  private errorLabel: HTMLElement | undefined = undefined;

  constructor(props: ComponentProps<InputProps>) {
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
          class="${css.input} {{#if isSearch}}${css.input_search} {{/if}}"
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

export const createInput: ComponentFactory<InputProps, Input> = (
  data: ComponentData<InputProps>,
): Input => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Input({ deps, data });
};
