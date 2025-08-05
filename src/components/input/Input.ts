import {
  ComponentProps,
  IChildrenData,
  IComponentAttributes,
  IComponentData,
  IComponentEvents,
  IComponentFactory,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { guardHTMLElement } from "../../utils/guards.ts";
import { IInputConfigs, TFieldNames } from "../../utils/input.d";
import css from "./input.module.css";

export class Input extends Component<
  IInputConfigs,
  IComponentAttributes,
  IComponentEvents,
  IChildrenData
> {
  private input: HTMLInputElement | undefined = undefined;
  private errorLabel: HTMLElement | undefined = undefined;

  constructor(
    props: ComponentProps<
      IInputConfigs,
      IComponentAttributes,
      IComponentEvents,
      IChildrenData
    >,
  ) {
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
type CF = IComponentFactory<
  IInputConfigs,
  IComponentAttributes,
  IComponentEvents,
  Input
>;

type D = IComponentData<
  IInputConfigs,
  IComponentAttributes,
  IComponentEvents,
  IChildrenData,
  Input
>;

export const createInput: CF = (data: D): Input => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Input({ deps, data });
};
