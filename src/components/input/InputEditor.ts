import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { IInputData } from "./input.d";
import css from "./input.module.css";

export interface InputEditorProps extends ComponentProps {
  configs: IInputData;
}

export class InputEditor extends Component {
  constructor(props: InputEditorProps) {
    const domService = new DOMService("div", {
      class: `${css.inputWrap} ${props.configs.class || ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <input
          class="${css.input} ${css.input_editor}"
          name="{{__id}}"
          type="{{__type}}"
          id="{{__id}}"
          placeholder="{{placeholder}}"
        />
        <label class="${css.inputEditLabel}" for="{{__id}}">{{__label}}</label>
      `;
  }
}
