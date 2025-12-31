import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import css from "./button.module.css";
import { ButtonProps } from "./types.ts";

export class Button extends Component<ButtonProps> {
  constructor(props: ComponentProps<ButtonProps, Button>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
    {{#if showSpinner}}
      <span class="${css.spinner}" />
    {{else}}
      {{ label }}
    {{/if}}
    `;
  }
}
