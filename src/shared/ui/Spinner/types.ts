import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface SpinnerProps extends BaseProps {
  configs: SpinnerConfigs;
}

export interface SpinnerConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "span">;
}
