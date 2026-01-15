import { UserResponse } from "@/shared/api/model/api.types";
import { PageId } from "@pages/page/config/const.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";

export interface SettingsProps extends BaseProps {
  configs: {
    id: PageId.Settings;
    rootTag: Extract<RootTag, "div">;
    classNames: string;
    profileName: string;
    profileAvatar: string;
    user: UserResponse | null;
  };
  on: {
    messengerClick: () => void;
  }
}

export type SettingsType = "change-password" | "change-info";

type SettingsMap =
  | "heading_backToChats"
  | "heading_profile"
  | "subheading_form"
  | "buttonEditInfo"
  | "buttonEditPassword"
  | "buttonLogout"
  | "inputsEditors_profile"
  | "inputsEditors_password";

export type SettingsNodes = ChildrenNodes<SettingsMap>;
