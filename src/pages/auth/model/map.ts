import { AppState } from "../../../app/providers/store/model/Store.ts";
import { ComponentPatch } from "../../../shared/lib/Component/model/types.ts";
import { AuthProps } from "./types.ts";

export const mapAuthState = (_state: AppState): ComponentPatch<AuthProps> => {
  return {};
};
