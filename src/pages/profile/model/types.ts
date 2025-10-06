import { InputEditor } from "../../../features/edit-profile/ui/InputEditor.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ChildrenMap, ChildrenSchema } from "../../../shared/lib/Component/model/children.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { ButtonProps } from "../../../shared/ui/Button/types.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { HeadingProps } from "../../../shared/ui/Heading/types.ts";
import { InputProps } from "../../../shared/ui/Input/Input.ts";

export interface ProfileProps extends BaseProps {
  configs: {
    tagName: Extract<TagNameType, "div">;
    profileName: string;
    profileAvatar: string;
  };
}

export interface ProfileMap extends ChildrenMap {
  singles: {
    heading_profile: {
      props: HeadingProps;
      instanceType: Heading;
    };
    heading_backToChats: {
      props: HeadingProps;
      instanceType: Heading;
    };
    buttonEditInfo: {
      props: ButtonProps;
      instanceType: Button;
    };
    buttonEditPassword: {
      props: ButtonProps;
      instanceType: Button;
    };
    buttonLogout: {
      props: ButtonProps;
      instanceType: Button;
    };
  };
  lists: {
    inputsEditors: {
      props: InputProps;
      instanceType: InputEditor[];
    };
  };
}

export type ProfileSchema = ChildrenSchema<ProfileMap>;

