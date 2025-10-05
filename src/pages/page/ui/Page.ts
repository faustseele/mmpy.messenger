import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ChildrenMap, ChildrenSchema } from "../../../shared/lib/Component/model/children.types.ts";
import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";

export class Page<
  TProps extends BaseProps,
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> extends Component<TProps, TMap, TSchema> {
  public pageParams: Record<string, string>;

  constructor(props: ComponentProps<TProps, TMap, TSchema>) {
    super(props);

    this.pageParams = {};
  }

  public setPageParams(params: Record<string, string>): void {
    this.pageParams = params;
  }

  public getSourceMarkup(): string {
    /* Reassigned in concrete Page Components */
    return /*html*/ ``;
  }
}
