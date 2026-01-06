import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { ButtonNodes, ButtonProps } from "./types.ts";

export class Button extends Component<ButtonProps> {
  constructor(props: ComponentProps<ButtonProps, Button>) {
    super(props);
  }

  public componentDidRender(): void {
    if (!this.element) {
      console.error("Button element is null");
      return;
    }

    this.element.setAttribute("type", this.configs.type);
  }

  public getSourceMarkup(): string {
    const nodes = this.children?.nodes as ButtonNodes;

    return /*html*/ `
    {{#if showSpinner}}
      {{{ ${nodes.spinner.params.configs.id} }}}
    {{else}}
      {{ label }}
    {{/if}}
    `;
  }
}
