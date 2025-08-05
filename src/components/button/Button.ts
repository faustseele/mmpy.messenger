import {
  ComponentProps,
  IChildrenData,
  IComponentData,
  IComponentEvents,
  IComponentFactory,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { ExtractComponentDataTypes } from "../../utils/generics.ts";
import { IButtonAttributes, IButtonConfigs } from "./button.d";

export class Button extends Component<
  IButtonConfigs,
  IButtonAttributes,
  IComponentEvents,
  IChildrenData
> {
  constructor(props: ComponentProps) {
    const { data, deps } = props;
    super({ deps, data });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{label}}
    `;
  }
}

/* Getting Data types for AuthPage */
type D = ExtractComponentDataTypes<Button>;

export const createButton: IComponentFactory<D[0], D[1], D[2], D[3]> = (
  data: IComponentData<D[0], D[1], D[2], D[3]>,
): D[3] => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Button({ deps, data });
};
