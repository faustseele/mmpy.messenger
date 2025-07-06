import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import css from "./input.module.css";

export interface InputProps {
  configs: {
    __id: string;
    __type: "text" | "email" | "password" | "tel";
    __label: string;
    class?: string;
  };
}

export class Input extends Component {
  constructor(props: InputProps) {
    const children = {};

    const domService = new DOMService("div", {
      class: `${css.inputWrap} ${props.configs.class || ""}`,
    });
    const templateService = new FragmentService();

    super({ configs: props.configs }, children, domService, templateService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <input
          class="${css.input}"
          name="{{__id}}"
          type="{{__type}}"
          id="{{__id}}"
          placeholder="{{__label}}"
        />
      `;
  }
}
