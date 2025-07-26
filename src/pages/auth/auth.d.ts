/* eslint-disable no-unused-vars */
/* ...params are used */
import { ButtonProps } from "../../components/button/Button.d";
import { IHeadingConfigs } from "../../components/heading/heading.d";
import { RouteLink } from "../../core/Router/router.d";
import {
  IComponentConfigs,
} from "../../framework/Component/Component.d";
import { IInputConfigs } from "../../utils/input.d";

export type TAuthRoutes = RouteLink.SignUp | RouteLink.SignIn;

export interface IAuthPageConfigs extends IComponentConfigs {
  type: TAuthPage;
  headingConfigs: IHeadingConfigs;
  inputConfigs: IInputConfigs[];
  buttonProps_submit: ButtonProps;
  buttonProps_reroute: ButtonProps;
}
