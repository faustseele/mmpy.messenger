import { ComponentData } from "../../framework/Component/component";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../utils/factory/factory.d";
import { SubheadingProps } from "./subheading.d";

export class Subheading extends Component<SubheadingProps> {
  constructor(props: ComponentParams<SubheadingProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return `{{text}}`;
  }
}

export const createSubheading: ComponentFactory<SubheadingProps> = (
  data: ComponentData<SubheadingProps>,
): Subheading => {
  data.configs.text = data.configs.text.toLowerCase();

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };
  
  return new Subheading({ deps, data });
};
