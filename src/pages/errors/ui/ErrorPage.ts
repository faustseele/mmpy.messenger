import { Page } from "@pages/page/ui/Page.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { Button } from "@shared/ui/Button/Button.ts";
import { ErrorNodes, ErrorProps } from "../model/types.ts";
import css from "./errors.module.css";

export class ErrorPage extends Page<ErrorProps> {
  constructor(props: ComponentProps<ErrorProps, ErrorPage>) {
    super(props);
  }

  public componentDidMount(): void {
    if (!this.children?.nodes) {
      throw new Error("children is not defined");
    }

    /* --- getting instances --- */
    const nodes = this.children.nodes as ErrorNodes;
    const backBtn = nodes["button_back"].runtime?.instance as Button;

    /* --- setting events --- */
    backBtn.setProps({
      on: {
        click: this.on?.back
      },
    });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <header class="${css.errorsHeadings}">
        {{{ heading }}}
        {{{ subheading }}}
      </header>
      
      <main>
        {{{ button_back }}}
      </main>
    `;
  }
}
