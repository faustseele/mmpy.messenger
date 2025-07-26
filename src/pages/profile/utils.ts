import { IComponentChildren } from "../../framework/Component/Component.d";
import {
  createButton,
  createHeading,
  createInputEditor,
} from "../../utils/componentFactory.ts";
import { IProfilePageConfigs } from "./profile.d";

export const createChildren = (configs: IProfilePageConfigs) => {
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
  } satisfies IComponentChildren;

  return children;
};
