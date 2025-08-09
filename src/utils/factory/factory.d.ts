import {
  BaseProps,
  ComponentParams,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import { Page } from "../../pages/Page.ts";

export type IComponentFactory<TProps extends BaseProps = BaseProps> = (
  /* data is used */
  // eslint-disable-next-line no-unused-vars
  data: ComponentParams<TProps>,
) => Component<TProps>;

export type IPageFactory<TProps extends BaseProps = BaseProps> = (
  /* data is used */
  // eslint-disable-next-line no-unused-vars
  data: ComponentParams<TProps>,
) => Page<TProps>;
