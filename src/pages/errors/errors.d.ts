import { Button, ButtonProps } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Subheading, SubheadingProps } from "../../components/subheading/Subheading.ts";
import { ChildrenPropsMap } from "../../framework/Component/children.d";
import { BaseProps } from "../../framework/Component/component.d";
import { ComponentConfigs } from "../../framework/Component/component.d";

export type ErrorCodeType = "404" | "500";

export interface ErrorPageProps extends BaseProps {
  configs: ErrorPageConfigs;
  childrenData?: ChildrenData<ErrorChildrenDataPropsMap>;
}

export interface ErrorPageConfigs extends ComponentConfigs {
  code: ErrorCodeType;
}

export interface ErrorChildrenDataPropsMap extends ChildrenPropsMap {
  heading: HeadingProps;
  subheading: SubheadingProps;
  button: ButtonProps;
}

export interface ErrorChildrenPropsMap extends ChildrenPropsMap {
    heading: Heading;
    subheading: Subheading;
    button: Button;
}
