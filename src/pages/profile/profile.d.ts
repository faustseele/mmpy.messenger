import { Button, ButtonProps } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { InputEditor, InputEditorProps } from "../../components/input/InputEditor.ts";
import { ChildrenPropsMap } from "../../framework/Component/Children.d";
import { BaseProps, IComponentConfigs } from "../../framework/Component/Component.d";

export interface ProfilePageProps extends BaseProps {
  configs: IProfilePageConfigs;
  childrenData?: IChildrenData<ProfileChildrenDataPropsMap>;
}

export interface IProfilePageConfigs extends IComponentConfigs {
  profileName: string;
  profileAvatar: string;
}

export interface ProfileChildrenDataPropsMap extends ChildrenPropsMap {
  heading_profile: HeadingProps;
  heading_backToChats: HeadingProps;
  inputEditors: InputEditorProps;
  buttonEditInfo: ButtonProps;
  buttonEditPassword: ButtonProps;
  buttonLogout: ButtonProps;
}

export interface ProfileChildrenPropsMap extends ChildrenPropsMap {
  heading_profile: Heading;
  heading_backToChats: Heading;
  inputsEditors: InputEditor;
  buttonEditInfo: Button;
  buttonEditPassword: Button;
  buttonLogout: Button;
}
