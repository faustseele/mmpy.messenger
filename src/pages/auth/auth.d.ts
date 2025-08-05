import { Button } from "../../components/button/Button.ts";
import { Heading } from "../../components/heading/Heading.ts";
import { Input } from "../../components/input/Input.ts";
import {
  IChildrenData,
  IChildrenMap,
  IComponentConfigs,
  IComponentData,
  IComponentFactory,
} from "../../framework/Component/Component.d";
import { TAuthRoutes } from "./AuthPage.d";

export type TAuthRoutes = RouteLink.SignUp | RouteLink.SignIn;

export interface IAuthData<
  IAuthConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
> extends IComponentData<IAuthConfigs, A, E> {
  configs: IAuthConfigs;
  attributes: {
    _class?: string;
  };
  childrenData: IChildrenData;
  componentFactory: IComponentFactory<C, A, E, ConcreteComponent>;
}

export interface IAuthConfigs extends IComponentConfigs {
  type: TAuthRoutes;
}

export interface IAuthChildrenMap extends IChildrenMap {
  heading: Heading;
  inputs: {
    slotName: string;
    list: Input[];
    componentFactory: IComponentFactory<C, A, E, ConcreteComponent>;
  };
  buttonFormSubmit: Button;
  buttonReroute: Button;
}

export interface IAuthChildrenData extends IChildrenData {
  heading: IHeadingData;
  inputs: {
    slotName: string;
    list: IInputData[];
    componentFactory: IComponentFactory;
  };
  buttonReroute: IButtonData;
  buttonFormSubmit: IButtonData;
}
