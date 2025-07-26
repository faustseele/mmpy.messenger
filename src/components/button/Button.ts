import {
  IComponentEvents,
  ComponentProps,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { IButtonConfigs } from "./button.d";
import css from "./button.module.css";

export interface ButtonProps extends ComponentProps {
  configs: IButtonConfigs;
  events?: IComponentEvents;
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    const { configs } = props;

    const domService = new DOMService("button", {
      ...configs,
      class: `${css.button} ${configs.__isSilent ? css.button_silent : ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{__label}}
    `;
  }
}
