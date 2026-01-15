import Component from "../../lib/Component/model/Component.ts";
import {
  ComponentProps
} from "../../lib/Component/model/types.ts";
import { SubheadingProps } from "./types.ts";

export class Subheading extends Component<SubheadingProps> {
  constructor(props: ComponentProps<SubheadingProps, Subheading>) {
    super(props);
  }

  public getInnerMarkup(): string {
    return `{{text}}`;
  }
}
