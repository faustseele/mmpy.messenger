import { AppState } from "@app/providers/store/model/Store.ts";
import { API_URL_RESOURCES } from "@shared/config/urls.ts";
import { ComponentPatch } from "@shared/lib/Component/model/types.ts";
import profileAvatar from "../../../../static/profile-avatar.png";
import { SettingsProps } from "./types.ts";

export const mapSettingsState = ({
  api: {
    auth: { user },
  },
}: AppState): ComponentPatch<SettingsProps> => {
  return {
    configs: {
      tagName: "div",
      profileName: user?.first_name ?? "",
      profileAvatar: user?.avatar
        ? `${API_URL_RESOURCES}${user.avatar}`
        : profileAvatar,
      user,
    },
  };
};
