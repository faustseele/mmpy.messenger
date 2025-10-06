import Component from "../../lib/Component/model/Component.ts";
import { ComponentData, ComponentProps } from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import css from "./heading.module.css";
import { HeadingProps } from "./types.ts";

export class Heading extends Component<HeadingProps> {
  constructor(props: ComponentProps<HeadingProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{#if isClickable}}
          <a class="${css.heading__text}
            ${css.heading__text_clickable}"">
            {{text}}
          </a>

        {{else}}
        
          <p class="${css.heading__text}
            {{#if isDrama}}
              ${css.heading__text_drama}
            {{/if}}">
            
            {{text}}
          </p>
        {{/if}}
      `;
  }
}

export const createHeading: ComponentFactory<HeadingProps, Heading> = (
  data: ComponentData<HeadingProps>,
): Heading => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Heading({ deps, data });
};
