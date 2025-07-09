import { ComponentChildren } from "../../core/Component/Component.d";
import {
  createButton,
  createHeading,
  createInputEditor,
} from "../../utils/componentFactory.ts";
import { IProfilePageData } from "./profile.d";

export const createChildren = (configs: IProfilePageData) => {
  const {
    headingData,
    inputEditorData,
    buttonDataEditInfo,
    buttonDataEditPassword,
    buttonDataLogout,
  } = configs;
  const children = {
    headings: headingData.map((headingProps) =>
      createHeading({ configs: headingProps }),
    ),
    inputs: inputEditorData.map((inputProps) =>
      createInputEditor({ configs: inputProps }),
    ),
    buttonEditInfo: [createButton(buttonDataEditInfo)],
    buttonEditPassword: [createButton(buttonDataEditPassword)],
    buttonLogout: [createButton(buttonDataLogout)],
  } satisfies ComponentChildren;

  return children;
};
