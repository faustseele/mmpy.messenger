import Router from "../../../app/providers/router/Router.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { RouteLink } from "../../../shared/types/universal.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Page } from "../../page/ui/Page.ts";
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
    const link = backBtn?.configs.link ?? RouteLink.Messenger;

    /* --- setting events --- */
    backBtn.setProps({
      on: {
        click: () => Router.go(link),
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
