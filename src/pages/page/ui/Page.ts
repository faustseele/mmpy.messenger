import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";

export abstract class Page<Props extends BaseProps> extends Component<Props> {
  public pageParams: Record<string, string>;

  constructor(props: ComponentProps<Props, Page<Props>>) {
    super(props);
    
    this.pageParams = {};
  }

  public setPageParams(params: Record<string, string>): void {
    this.pageParams = params;
  }

  public getInnerMarkup(): string {
    /* reassigned in concrete Page */
    return /*html*/ ``;
  }
}
