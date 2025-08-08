import { Button, ButtonProps } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Subheading, SubheadingProps } from "../../components/subheading/Subheading.ts";
import { ChildrenPropsMap } from "../../framework/Component/Children.d.ts";
import { BaseProps } from "../../framework/Component/Component.d";
import { IComponentConfigs } from "../../framework/Component/Component.d";

export type TErrorPageCode = "404" | "500";

export interface ErrorPageProps extends BaseProps {
  configs: IErrorPageConfigs;
  childrenData?: IChildrenData<ErrorChildrenDataPropsMap>;
}

export interface IErrorPageConfigs extends IComponentConfigs {
  code: TErrorPageCode;
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
