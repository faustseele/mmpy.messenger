import {
  BaseProps,
  ComponentParams,
} from "../../framework/Component/component.d";
import Component from "../../framework/Component/Component.ts";
import { Page } from "../../pages/Page.ts";

export type ComponentFactory<TProps extends BaseProps = BaseProps> = (
  /* data is used */
  // eslint-disable-next-line no-unused-vars
  data: ComponentParams<TProps>,
) => Component<TProps>;

export type PageFactory<TProps extends BaseProps = BaseProps> = (
  /* data is used */
  // eslint-disable-next-line no-unused-vars
  data: ComponentParams<TProps>,
) => Page<TProps>;
