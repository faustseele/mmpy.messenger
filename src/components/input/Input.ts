import {
  BaseProps,
  IComponentData,
} from "../../framework/Component/Component.d";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { guardHTMLElement } from "../../utils/guards.ts";
import { IInputAttributes, IInputConfigs, TFieldNames } from "../../utils/input.d";
import css from "./input.module.css";

export interface InputProps extends BaseProps {
  configs: IInputConfigs;
  attributes?: IInputAttributes;
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

  public getNameAndValue(): { name: TFieldNames | ""; value: string } {
    if (!guardHTMLElement("Input.input", this.input)) {
      return { name: "", value: "" };
    }

    return { name: this.input.name as TFieldNames, value: this.input.value };
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

export const createInput: IComponentFactory<InputProps> = (
  data: IComponentData<InputProps>,
): Input => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Input({ deps, data });
};
