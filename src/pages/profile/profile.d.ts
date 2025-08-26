import { Button, ButtonProps } from "../../components/button/Button.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import {
  InputEditor,
  InputEditorProps,
} from "../../components/input/InputEditor.ts";
import { UserResponse } from "../../framework/API/api.d";
import { ChildrenPropsMap } from "../../framework/Component/children.d";
import {
  BaseProps,
  ComponentConfigs,
} from "../../framework/Component/component.d";

export interface ProfilePageProps extends BaseProps {
  configs: ProfilePageConfigs;
  childrenData?: ChildrenData<ProfileChildrenDataPropsMap>;
  storeProps: UserResponse;
}

export interface ProfilePageConfigs extends ComponentConfigs {
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
