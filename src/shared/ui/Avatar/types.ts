import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { RootTag } from "../../lib/DOM/types.ts";

export interface AvatarProps extends BaseProps {
  configs: AvatarConfigs;
}

export interface AvatarConfigs extends BaseConfigs {
  rootTag: Extract<RootTag, "div">;
  title: string;
  src: string;
  letter: string;
  noAvatar: boolean;
  hasInput?: boolean;
  isBig?: boolean;
}
