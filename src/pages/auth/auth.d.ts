/* eslint-disable no-unused-vars */
/* ...params are used */
import { IButtonData } from "../../components/button/button.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { IInputData } from "../../utils/input.d";
import {
  ComponentConfigs,
  ComponentEvents,
} from "../../core/Component/Component.d";

export type TAuthPage = Extract<TLink, "/sign-in" | "/sign-up">;

export interface IAuthPageData extends ComponentConfigs {
  type: TAuthPage;
  headingData: IHeadingData;
  inputData: IInputData[];
  buttonData_submit: {
    configs: IButtonData;
    events: ComponentEvents;
  };
  buttonData_reroute: {
    configs: IButtonData;
    events: ComponentEvents;
  };
}
