import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import css from "./button.module.css";

export interface ButtonProps {
  configs: {
    __label: string;
    __type: "button" | "submit";
    __isSilent?: boolean;
    __link?: string;
    class?: string;
  };
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    const children = {};

    /* Factory is responsible for creating dependencies */
    const domService = new DOMService("button", {
      class: `${css.button}
                ${props.configs.__isSilent ? css.button_silent : ""}
                ${props.configs.class || ""}`,
      type: props.configs.__type,
    });
    const templateService = new FragmentService();

    super({ configs: props.configs }, children, domService, templateService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <a href="{{ __link }}" class="newRoute">
          {{ __label }}
        </a>
      `;
  }
}
