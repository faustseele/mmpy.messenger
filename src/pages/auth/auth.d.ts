import { Button } from "../../components/button/Button.ts";
import { IHeadingData } from "../../components/heading/heading.d";
import { Heading } from "../../components/heading/Heading.ts";
import { Input } from "../../components/input/Input.ts";
import {
  BaseProps,
  IChildren,
  IChildrenData,
  IComponentConfigs,
  IComponentData,
  IComponentFactory,
} from "../../framework/Component/Component.d";
import { AuthProps } from "./AuthPage.ts";

export interface IAuthData extends IComponentData<BaseProps> {
  configs: AuthProps["configs"];
  attributes: AuthProps["attributes"];
  events: AuthProps["events"];
  childrenData: AuthProps["childrenData"];
  children: IAuthChildren;
  componentFactory: IComponentFactory<BaseProps>;
}

export interface IAuthConfigs extends IComponentConfigs {
  type: RouteLink.SignUp | RouteLink.SignIn;
}

export interface IAuthChildrenData extends IChildrenData<AuthProps> {
  heading: {
    type: "single";
    data: IHeadingData;
  };
  inputs: {
    type: "list";
    listKey: string;
    childrenFactory: IComponentFactory<BaseProps>;
    dataList: IInputData[];
  };
  buttonReroute: {
    type: "single";
    data: IButtonData;
  };
  buttonFormSubmit: {
    type: "single";
    data: IButtonData;
  };
}

export interface IAuthChildren extends IChildren {
  heading: {
    type: "single";
    child: Heading;
  };
  inputs: {
    type: "list";
    listKey: string;
    children: Input[];
    childrenFactory: IComponentFactory<BaseProps>;
  };
  buttonFormSubmit: {
    type: "single";
    child: Button;
  };
  buttonReroute: {
    type: "single";
    child: Button;
  };
}
