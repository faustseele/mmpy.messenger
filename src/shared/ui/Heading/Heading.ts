import { ComponentData } from "../../../../framework/Component/component";
import Component, {
  ComponentParams,
} from "../../../../framework/Component/Component.ts";
import DOMService from "../../../../services/render/DOM/DOMService.ts";
import FragmentService from "../../../../services/render/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../../utils/factory/factory";
import { HeadingProps } from "./types.ts";
import css from "./heading.module.css";

export class Heading extends Component<HeadingProps> {
  constructor(props: ComponentParams) {
    const { deps, data } = props;

    super({ deps, data });
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

export const createHeading: ComponentFactory<HeadingProps> = (
  data: ComponentData<HeadingProps>,
): Heading => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Heading({ deps, data });
};
