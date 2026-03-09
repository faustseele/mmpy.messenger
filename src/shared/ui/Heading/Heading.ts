import { i18n } from "@shared/i18n/I18nService.ts";
import { cx } from "@shared/lib/helpers/formatting/classnames.ts";
import Component from "../../lib/Component/model/Component.ts";
import { ComponentProps } from "../../lib/Component/model/types.ts";
import css from "./heading.module.css";
import { HeadingProps } from "./types.ts";

export class Heading extends Component<HeadingProps> {
  constructor(props: ComponentProps<HeadingProps, Heading>) {
    super(props);
  }

  public getRootTagCx(): string {
    const { isClickable, isDrama } = this.configs;
    return cx(
      css.heading,
      isClickable && css.heading_clickable,
      isDrama && css.heading_drama,
    );
  }

  public getInnerMarkup(): string {
    return /*html*/ `
      ${i18n.t(this.configs.i18nKey)} 
    `;
  }
}
