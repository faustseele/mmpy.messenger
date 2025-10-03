import { InputEditor } from "../../../features/edit-profile/ui/InputEditor.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ChildrenSchema } from "../../../shared/lib/Component/model/children.types.ts";
import { ComponentConfigs } from "../../../shared/lib/Component/model/types.ts";
import { Button, createButton } from "../../../shared/ui/Button/Button.ts";
import { ButtonProps } from "../../../shared/ui/Button/types.ts";
import { createHeading, Heading } from "../../../shared/ui/Heading/Heading.ts";
import { HeadingProps } from "../../../shared/ui/Heading/types.ts";
import { InputProps } from "../../../shared/ui/Input/Input.ts";


export interface ProfilePageProps extends BaseProps {
}

export interface ProfilePageConfigs extends ComponentConfigs {
  profileName: string;
  profileAvatar: string;
}

type ProfileChildrenSchema = ChildrenSchema<ProfileChildrenProps>;


export type ProfileChildrenProps =  {
  headingProps_profile: HeadingProps;
  headingProps_backToChats: HeadingProps;
  inputsProps: InputProps;
  buttonProps_editInfo: ButtonProps;
  buttonProps_editPassword: ButtonProps;
  buttonProps_signOut: ButtonProps;
}


const profileSchema: ProfileChildrenSchema = {

}


export interface ProfileChildrenMap extends ChildrenMap {
  heading_profile: Heading;
  heading_backToChats: Heading;
  inputsEditors: InputEditor;
  buttonEditInfo: Button;
  buttonEditPassword: Button;
  buttonLogout: Button;
}
