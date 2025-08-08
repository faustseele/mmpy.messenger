import { IComponentData } from "../../framework/Component/Component.d";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import { SubheadingProps } from "./subheading.d";

export class Subheading extends Component<SubheadingProps> {
  constructor(props: ComponentParams<SubheadingProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return `{{text}}`;
  }
}

export const createSubheading: IComponentFactory<SubheadingProps> = (
  data: IComponentData<SubheadingProps>,
): Subheading => {
  data.configs.text = data.configs.text.toLowerCase();

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };
  
  return new Subheading({ deps, data });
};
