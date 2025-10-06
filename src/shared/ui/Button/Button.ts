import Component from "../../lib/Component/model/Component.ts";
import {
  ComponentData,
  ComponentProps
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { ButtonProps } from "./types.ts";

export class Button extends Component<ButtonProps> {
  constructor(props: ComponentProps<ButtonProps>) {
    const { data, deps } = props;
    super({ deps, data });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{label}}
    `;
  }
}

export const createButton: ComponentFactory<ButtonProps, Button> = (
  data: ComponentData<ButtonProps>,
): Button => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Button({ deps, data });
};
