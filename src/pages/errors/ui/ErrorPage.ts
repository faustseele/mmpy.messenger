import { Page } from "@pages/page/ui/Page.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { ErrorProps } from "../model/types.ts";
import css from "./errors.module.css";

export class ErrorPage extends Page<ErrorProps> {
  constructor(props: ComponentProps<ErrorProps, ErrorPage>) {
    super(props);
  }

  public componentDidMount(): void {
    if (!this.children?.nodes) {
      throw new Error("children is not defined");
    }

  }

  public getInnerMarkup(): string {
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
