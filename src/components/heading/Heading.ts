import Component from "../../core/Component/Component.ts";
import type { Link } from "../../pages/pages.d";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import css from "./heading.module.css";

export interface HeadingProps {
  configs: {
    __text: string;
    __isClickable?: boolean;
    __isDrama?: boolean;
    __link?: Link;
    class?: string;
  };
}

export class Heading extends Component {
  constructor(props: HeadingProps) {
    const children = {};

    const domService = new DOMService("h1", {
      class: `${css.heading} ${props.configs.class || ""}`,
    });
    const templateService = new FragmentService();

    super({ configs: props.configs }, children, domService, templateService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{#if __isClickable}}
          <a class="${css.heading__text} ${css.heading__text_clickable} newRoute" href="{{__link}}">
            {{__text}}
          </a>
        {{else}}
          <p class="${css.heading__text} {{#if __isDrama}}${css.heading__text_drama}{{/if}}">
            {{__text}}
          </p>
        {{/if}}
      `;
  }
}
