import { BaseProps, IComponentData } from "../../framework/Component/Component.d";
import Component, {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import { IComponentFactory } from "../../services/factory/factory.d";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IHeadingConfigs } from "./heading.d";
import css from "./heading.module.css";

export interface HeadingProps extends BaseProps {
  configs: IHeadingConfigs;
}

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
            {{#if __isDrama}}
              ${css.heading__text_drama}
            {{/if}}">
            
            {{text}}
          </p>
        {{/if}}
      `;
  }
}

export const createHeading: IComponentFactory<HeadingProps> = (
  data: IComponentData<HeadingProps>,
): Heading => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Heading({ deps, data });
};
