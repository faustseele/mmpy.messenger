import Component, {
  ComponentParams,
} from "../framework/Component/Component.ts";
import { BaseProps } from "../framework/Component/Component.d";

export class Page<TProps extends BaseProps> extends Component<TProps> {
  public pageParams: Record<string, string>;

  constructor(props: ComponentParams) {
    super(props);

    this.pageParams = {};
    console.log(this.pageParams);
  }

  public setPageParams(params: Record<string, string>): void {
    this.pageParams = params;
  }

  public getSourceMarkup(): string {
    /* Reassigned in concrete Page Components */
    return /*html*/ ``;
  }
}
