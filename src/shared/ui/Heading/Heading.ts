import Component from "../../lib/Component/model/Component.ts";
import { ComponentProps } from "../../lib/Component/model/types.ts";
import css from "./heading.module.css";
import { HeadingProps } from "./types.ts";

export class Heading extends Component<HeadingProps> {
  constructor(props: ComponentProps<HeadingProps, Heading>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{#if isClickable}}
          <a class="${css.heading__text}
            ${css.heading__text_clickable}"">
            {{ text }}
          </a>

        {{else}}
        
          <p class="${css.heading__text}
            {{#if isDrama}}
              ${css.heading__text_drama}
            {{/if}}">
            
            {{ text }}
          </p>
        {{/if}}
      `;
  }
}
