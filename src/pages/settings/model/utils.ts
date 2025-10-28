import profileAvatar from "../../../../static/profile-avatar.png";
import { AppState } from "../../../app/providers/store/Store.ts";
import { API_URL_RESOURCES } from "../../../shared/config/urls.ts";
import {
  ComponentDeps,
  ComponentParams,
  ComponentPatch,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { SettingsPage } from "../ui/SettingsPage.ts";
import { SettingsProps } from "./types.ts";

export const buildSettingsPage: PageFactory<SettingsProps, SettingsPage> = (
  params: ComponentParams<SettingsProps>,
): SettingsPage => {
  const deps: ComponentDeps<SettingsProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node = {
    factory: buildSettingsPage,
    params,
  };

  return new SettingsPage({
    deps,
    node,
  });
};

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
    },
  };
};
