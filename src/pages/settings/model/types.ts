import { UserResponse } from "@shared/api/model/api.types";
import { PageId } from "@pages/page/config/const.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";

export interface SettingsProps extends BaseProps {
  configs: {
    id: PageId.Settings;
    rootTag: Extract<RootTag, "form">;
    classNames: string;
    type: SettingsType;
    profileName: string;
    user: UserResponse | null;
  };
  on: {
    messengerClick: () => void;
    submit: () => void;
  };
}

export type SettingsType = "change-password" | "change-info";

type SettingsMap =
  | "heading_profile"
  | "heading_backToChats"
  | "user_avatar"
  | "user_avatar_mobile"
  | "subheading_form"
  | "buttonEditInfo"
  | "buttonEditPassword"
  | "inputsEditors_info"
  | "inputsEditors_password"
  | "buttonLanguage"
  | "buttonLogout";

export type SettingsNodes = ChildrenNodes<SettingsMap>;
