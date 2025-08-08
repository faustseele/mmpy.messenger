import { Button, ButtonProps } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Input, InputProps } from "../../components/input/Input.ts";
import { ChildrenPropsMap } from "../../framework/Component/Children.d";
import {
  IComponentConfigs
} from "../../framework/Component/Component.d";

export interface IAuthConfigs extends IComponentConfigs {
  type: RouteLink.SignUp | RouteLink.SignIn;
}

export interface AuthChildrenDataPropsMap extends ChildrenPropsMap {
  heading: HeadingProps;
  inputs: InputProps;
  buttonReroute: ButtonProps;
  buttonFormSubmit: ButtonProps;
}

export interface AuthChildrenPropsMap extends ChildrenPropsMap {
  heading: Heading;
  inputs: Input;
  buttonReroute: Button;
  buttonFormSubmit: Button;
}
