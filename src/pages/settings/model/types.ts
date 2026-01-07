import { UserResponse } from "@/shared/api/model/api.types";
import { PageId } from "@pages/page/config/const.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";

export interface SettingsProps extends BaseProps {
  configs: {
    id: PageId.Settings;
    tagName: Extract<TagNameType, "div">;
    classNames: string;
    profileName: string;
    profileAvatar: string;
    user: UserResponse | null;
  };
  on: {
    messengerClick: () => void;
  }
}

type SettingsMap =
  | "heading_backToChats"
  | "heading_profile"
  | "buttonEditInfo"
  | "buttonEditPassword"
  | "buttonLogout"
  | "inputsEditors";

export type SettingsNodes = ChildrenNodes<SettingsMap>;
