import Component from "../../lib/Component/model/Component.ts";
import {
  ComponentProps
} from "../../lib/Component/model/types.ts";
import { ButtonProps } from "./types.ts";

export class Button extends Component<ButtonProps> {
  constructor(props: ComponentProps<ButtonProps, Button>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        {{ label }}
    `;
  }
}

