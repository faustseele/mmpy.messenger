import {
  BaseProps,
  IComponentData,
} from "../../framework/Component/Component.d";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IButtonAttributes, IButtonConfigs } from "./button.d";

export interface ButtonProps extends BaseProps {
  configs: IButtonConfigs;
  attributes?: IButtonAttributes;
  events?: BaseProps["events"];
  childrenData?: BaseProps["childrenData"];
} 

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

export const createButton: IComponentFactory<ButtonProps> = (
  data: IComponentData<ButtonProps>,
): Button => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Button({ deps, data });
};
