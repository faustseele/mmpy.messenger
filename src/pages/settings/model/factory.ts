import { connect } from "@app/providers/store/model/connect.ts";
import {
  ComponentDeps,
  ComponentParams,
} from "@shared/lib/Component/model/types.ts";
import DOMService from "@shared/lib/DOM/DOMService.ts";
import FragmentService from "@shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "@shared/lib/helpers/factory/types.ts";
import { PageNode } from "@pages/page/model/types.ts";
import { settingsPageParams } from "../config/params.ts";
import { SettingsPage } from "../ui/SettingsPage.ts";
import { mapSettingsState } from "./map.ts";
import { SettingsProps } from "./types.ts";

export const createSettingsPage = () =>
  connect(getSettingsPageNode(), mapSettingsState);

const getSettingsPageNode = (): PageNode<SettingsProps, SettingsPage> => {
  return {
    params: settingsPageParams,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    factory: buildSettingsPage as any,
  };
};

const buildSettingsPage: PageFactory<SettingsProps, SettingsPage> = (
  params: ComponentParams<SettingsProps>,
): SettingsPage => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<SettingsProps> = {
    domService: new DOMService(id, rootTag),
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
