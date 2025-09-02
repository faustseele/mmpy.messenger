import {
  ComponentData
} from "../../../framework/Component/component.d";
import Component, { ComponentParams } from "../../../framework/Component/Component.ts";
import DOMService from "../../../services/render/DOM/DOMService.ts";
import FragmentService from "../../../services/render/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../utils/factory/factory.ts";
import { ButtonProps } from "../model/types.ts";

export class Button extends Component<ButtonProps> {
  constructor(props: ComponentParams<ButtonProps>) {
    const { data, deps } = props;
    super({ deps, data });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{label}}
    `;
  }
}

export const createButton: ComponentFactory<ButtonProps> = (
  data: ComponentData<ButtonProps>,
): Button => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Button({ deps, data });
};
