import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentNode } from "../../../shared/lib/Component/model/types.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { Page } from "../ui/Page.ts";

export interface PageNode<P extends BaseProps, C extends Page<P>> extends ComponentNode<P, C> {
  factory: PageFactory<P, C>;
}

export interface PageConfigs {
  pageParams: Record<string, string>;
  /* Additional props */
  options?: Record<string, unknown>;
}
