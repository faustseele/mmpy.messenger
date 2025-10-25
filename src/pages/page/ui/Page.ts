import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";

export abstract class Page<Props extends BaseProps> extends Component<Props> {
  public pageParams: Record<string, string>;

  constructor(props: ComponentProps<Props, Page<Props>>) {
    super(props);

    this.pageParams = {};
  }

  public componentDidMount(): void {
  }

  public setPageParams(params: Record<string, string>): void {
    this.pageParams = params;
  }

  public getSourceMarkup(): string {
    /* Reassigned in concrete Page Components */
    return /*html*/ ``;
  }
}
