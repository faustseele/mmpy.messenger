import { ComponentProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { guardHTMLElement } from "../../utils/guards.ts";
import { IInputConfigs, TFieldNames } from "../../utils/input.d";
import css from "./input.module.css";

export interface InputProps extends ComponentProps {
  configs: IInputConfigs;
}

export class Input extends Component {
  private input: HTMLInputElement | undefined = undefined;
  private errorLabel: HTMLElement | undefined = undefined;

  constructor(props: InputProps) {
    const { configs } = props;

    const domService = new DOMService("div", {
      class: `${css.inputWrap} ${configs.class || ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);

    this.input = this.getElement()?.querySelector("input") ?? undefined;
    this.errorLabel =
      this.getElement()?.querySelector(`.${css.errorLabel}`) ?? undefined;
  }

  public getNameAndValue(): { name: TFieldNames | ""; value: string }{
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
        />
        <span class="${css.errorLabel}"></span>
      `;
  }
}
