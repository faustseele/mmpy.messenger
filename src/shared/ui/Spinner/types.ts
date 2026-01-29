import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { RootTag } from "../../lib/DOM/types.ts";

export interface SpinnerProps extends BaseProps {
  configs: SpinnerConfigs;
}

export interface SpinnerConfigs extends BaseConfigs {
  rootTag: Extract<RootTag, "span">;
  isOn: boolean;
  isBig?: boolean;
}
