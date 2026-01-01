import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import css from './spinner.module.css';
import { SpinnerProps } from "./types.ts";

export class Spinner extends Component<SpinnerProps> {
  constructor(props: ComponentProps<SpinnerProps, Spinner>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <span class="${css.spinner}" />
    `;
  }
}
