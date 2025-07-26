import { ComponentProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { IHeadingConfigs } from "./heading.d";
import css from "./heading.module.css";

export interface HeadingProps extends ComponentProps {
  configs: IHeadingConfigs;
}

export class Heading extends Component {
  constructor(props: HeadingProps) {
    const domService = new DOMService("h1", {
      class: `${css.heading} ${props.configs.class || ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{#if __isClickable}}
          <a class="${css.heading__text}
            ${css.heading__text_clickable}"">
            {{__text}}
          </a>

        {{else}}
        
          <p class="${css.heading__text}
            {{#if __isDrama}}
              ${css.heading__text_drama}
            {{/if}}">
            
            {{__text}}
          </p>
        {{/if}}
      `;
  }
}
