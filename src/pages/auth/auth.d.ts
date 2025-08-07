import { Button } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Input, InputProps } from "../../components/input/Input.ts";
import {
  BaseProps,
  IChildren,
  IChildrenData,
  IComponentConfigs,
  IComponentData,
  IComponentFactory
} from "../../framework/Component/Component.d";

export interface IAuthConfigs extends IComponentConfigs {
  type: RouteLink.SignUp | RouteLink.SignIn;
}

export interface IAuthChildrenData extends IChildrenData { 
  heading: {
    type: "single";
    data: IComponentData<HeadingProps>;
  };
  inputs: {
    type: "list";
    slotKey: "inputs";
    childrenFactory: IComponentFactory<BaseProps>;
    dataList: IComponentData<InputProps>[]
  };
  buttonReroute: {
    type: "single";
    data: IComponentData<ButtonProps>;
  };
  buttonFormSubmit: {
    type: "single";
    data: IComponentData<ButtonProps>;
  };
};

export interface IAuthChildren extends IChildren {
  heading: {
    type: "single";
    child: Heading;
  };
  inputs: {
    type: "list";
    slotKey: string;
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
