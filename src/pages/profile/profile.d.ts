import { IButtonData } from "../../components/button/button.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { IInputData } from "../../utils/input.d";
import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IProfilePageData extends ComponentConfigs {
  __profileName: string;
  headingData_backToChats: IHeadingData;
  headingData_profile: IHeadingData;
  inputEditorData: IInputData[];
  buttonData_editInfo: {
    configs: IButtonData;
    events: ComponentConfigs;
  };
  buttonData_editPassword: {
    configs: IButtonData;
    events: ComponentConfigs;
  };
  buttonData_signOut: {
    configs: IButtonData;
    events: ComponentConfigs;
  }
}
