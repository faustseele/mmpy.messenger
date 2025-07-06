import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { IButtonData } from "./button.d";
import css from "./button.module.css";

export interface ButtonProps extends ComponentProps {
  configs: IButtonData
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    const domService = new DOMService("button", {
      class: `${css.button}
                ${props.configs.__isSilent ? css.button_silent : ""}
                ${props.configs.class || ""}`,
      type: props.configs.__type,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <a href="{{ __link }}" class="newRoute">
          {{ __label }}
        </a>
      `;
  }
}
