import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { IInputData } from "./input.d";
import css from "./input.module.css";

export interface InputProps extends ComponentProps {
  configs: IInputData;
}

export class Input extends Component {
  constructor(props: InputProps) {
    const { configs } = props;

    const domService = new DOMService("div", {
      class: `${css.inputWrap} ${configs.class || ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getNameAndValue(): { name: string; value: string } {
    const inputElement = this.getElement()?.querySelector("input");

    if (!inputElement) {
      // console.error("Input element is not defined", this, inputElement);
      return { name: "", value: "" };
    }
    
    return { name: inputElement.name, value: inputElement.value };
  }

  public showError(message: string): void {
    const errorLabel = this.getElement()?.querySelector(`.${css.errorLabel}`);
    if (errorLabel instanceof HTMLElement) {
      errorLabel.textContent = message;
      errorLabel.style.display = "none";
    }
  }

  public hideError(): void {
    const errorLabel = this.getElement()?.querySelector(`.${css.errorLabel}`);
    if (errorLabel instanceof HTMLElement) {
      errorLabel.style.display = "none";
    }
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
      `;
  }
}
