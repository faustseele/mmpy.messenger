import { Page } from "@pages/page/ui/Page.ts";
import { BaseProps } from "../../Component/model/base.types.ts";
import Component from "../../Component/model/Component.ts";
import { ComponentParams } from "../../Component/model/types.ts";

export type ComponentFactory<P extends BaseProps, C extends Component<P>> = (
  args: ComponentParams<P>,
) => C;

export type PageFactory<P extends BaseProps, C extends Page<P>> = (
  args: ComponentParams<P>,
) => C;
