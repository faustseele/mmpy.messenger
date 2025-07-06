import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { ISubheadingData } from "./subheading.d";
import css from "./subheading.module.css";

export interface SubheadingProps extends ComponentProps {
  configs: ISubheadingData;
}

export class Subheading extends Component {
  constructor(props: SubheadingProps) {
    const subheadingClasses = [
      css.subheading,
      props.configs.__isDrama ? css.subheading_drama : "",
      props.configs.class || "",
    ]
      .join(" ")
      .trim();

    const domService = new DOMService("h2", { class: subheadingClasses });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return `{{__text}}`;
  }
}
