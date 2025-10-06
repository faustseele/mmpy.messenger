import Component from "../../lib/Component/model/Component.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { SubheadingProps } from "./types.ts";

export class Subheading extends Component<SubheadingProps> {
  constructor(props: ComponentProps<SubheadingProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return `{{text}}`;
  }
}

export const createSubheading: ComponentFactory<SubheadingProps, Subheading> = (
  data: ComponentData<SubheadingProps>,
): Subheading => {
  data.configs.text = data.configs.text.toLowerCase();

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new Subheading({ deps, data });
};
