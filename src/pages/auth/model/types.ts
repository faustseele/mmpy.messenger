import { Button, ButtonProps } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Input, InputProps } from "../../components/input/Input.ts";
import { ChildrenPropsMap } from "../../framework/Component/children.d";
import {
  ComponentConfigs
} from "../../framework/Component/component.d";

export type AuthType = "sign-up" | "sign-in";

export interface AuthConfigs extends ComponentConfigs {
  type: AuthType;
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
