import { ChildrenData } from "../../framework/Component/component";
import {
  createButton,
  createHeading,
  createInputEditor,
} from "../../utils/factory/factory.ts";
import { ProfilePageConfigs } from "./profile.d";

export const createChildren = (configs: ProfilePageConfigs) => {
  const {
    headingConfigs_profile,
    headingConfigs_backToChats,
    inputEditorConfigs,
    buttonProps_editInfo,
    buttonProps_editPassword,
    buttonProps_signOut,
  } = configs;
  const children = {
    heading_profile: createHeading({ configs: headingConfigs_profile }),
    heading_backToChats: createHeading({ configs: headingConfigs_backToChats }),
    inputs: inputEditorConfigs.map((inputProps) =>
      createInputEditor({ configs: inputProps }),
    ),
    buttonEditInfo: createButton(buttonProps_editInfo),
    buttonEditPassword: createButton(buttonProps_editPassword),
    buttonLogout: createButton(buttonProps_signOut),
  } satisfies ChildrenData;

  return children;
};
