import { IButtonData } from "../../components/button/button.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { IInputData } from "../../components/input/input.d";
import { ComponentConfigs } from "../../core/Component/Component.d";

export type TAuthPage = "/sign-in" | "/sign-up";

export interface IAuthPageData extends ComponentConfigs {
  type: TAuthPage;
  headingData: IHeadingData[];
  inputData: IInputData[];
  buttonData: IButtonData[];
}
