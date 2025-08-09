import Component, {
  ComponentParams,
} from "../framework/Component/Component.ts";
import { BaseProps } from "../framework/Component/Component.d";

export class Page<TProps extends BaseProps> extends Component<TProps> {
  private _pageParams: Record<string, string>;

  constructor(props: ComponentParams) {
    super(props);

    this._pageParams = {};
    console.log(this._pageParams);
  }

  public setPageParams(params: Record<string, string>): void {
    this._pageParams = params;
  }

  public getSourceMarkup(): string {
    return /*html*/ ``;
  }
}
