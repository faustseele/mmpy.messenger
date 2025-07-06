import { IButtonData } from "../../components/button/button.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { IInputData } from "../../components/input/input.d";
import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IProfileContextData {
  __name: string;
}

export interface IProfilePageData extends ComponentConfigs {
  __name: string;
  headingData: IHeadingData[];
  profileData: IProfileContextData;
  inputEditorData: IInputData[];
  buttonData: IButtonData[];
}
