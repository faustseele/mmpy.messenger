import { ComponentProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { ISubheadingConfigs } from "./subheading.d";
import css from "./subheading.module.css";

export interface SubheadingProps extends ComponentProps {
  configs: ISubheadingConfigs;
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

    /* Setting subheading to lowercase for better readability */
    props.configs.__text = props.configs.__text.toLowerCase();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return `{{__text}}`;
  }
}
