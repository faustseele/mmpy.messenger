import { IHeadingConfigs } from "../../components/heading/heading.d";
import { IInputConfigs } from "../../utils/input.d";
import { IComponentConfigs } from "../../framework/Component/Component.d";
import { ButtonProps } from "../../components/button/Button.ts";

export interface IProfilePageConfigs extends IComponentConfigs {
  __profileName: string;
  headingConfigs_backToChats: IHeadingConfigs;
  headingConfigs_profile: IHeadingConfigs;
  inputEditorConfigs: IInputConfigs[];
  buttonProps_editInfo: ButtonProps;
  buttonProps_editPassword: ButtonProps;
  buttonProps_signOut: ButtonProps;
}
