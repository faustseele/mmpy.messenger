import {
  BaseProps,
  ComponentParams,
  IComponentData,
  IComponentFactory
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { ExtractComponentDataTypes } from "../../utils/generics.ts";
import css from "./heading.module.css";

export class Heading extends Component<BaseProps> {
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
            {{#if __isDrama}}
              ${css.heading__text_drama}
            {{/if}}">
            
            {{text}}
          </p>
        {{/if}}
      `;
  }
}

/* Getting Data types for AuthPage */
type D = ExtractComponentDataTypes<Heading>;

export const createHeading: IComponentFactory<D[0], D[1], D[2], D[3]> = (
  data: IComponentData<D[0], D[1], D[2], D[3]>,
): D[3] => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Heading({ deps, data });
};
