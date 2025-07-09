import { ComponentChildren } from "../../core/Component/Component.d";
import {
  createButton,
  createHeading,
  createInputEditor,
} from "../../utils/componentFactory.ts";
import { IProfilePageData } from "./profile.d";

export const createChildren = (configs: IProfilePageData) => {
  const {
    headingData_profile,
    headingData_backToChats,
    inputEditorData,
    buttonData_editInfo,
    buttonData_editPassword,
    buttonData_signOut,
  } = configs;
  const children = {
    heading_profile: createHeading({ configs: headingData_profile }),
    heading_backToChats: createHeading({ configs: headingData_backToChats }),
    inputs: inputEditorData.map((inputProps) =>
      createInputEditor({ configs: inputProps }),
    ),
    buttonEditInfo: createButton(buttonData_editInfo),
    buttonEditPassword: createButton(buttonData_editPassword),
    buttonLogout: createButton(buttonData_signOut),
  } satisfies ComponentChildren;

  return children;
};
