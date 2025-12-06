import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";
import { PageId } from "@pages/page/config/const.ts";

export interface SettingsProps extends BaseProps {
  configs: {
    id: PageId.Settings;
    tagName: Extract<TagNameType, "div">;
    profileName: string;
    profileAvatar: string;
  };
}

type SettingsMap =
  | "heading_backToChats"
  | "heading_profile"
  | "buttonEditInfo"
  | "buttonEditPassword"
  | "buttonLogout"
  | "inputsEditors";

export type SettingsNodes = ChildrenNodes<SettingsMap>;
