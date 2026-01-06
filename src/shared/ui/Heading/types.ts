import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";
import { RouteLink } from "../../types/universal.ts";

export interface HeadingProps extends BaseProps {
  configs: HeadingConfigs;
}

export interface HeadingConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "h1">;
  text: string;
  isClickable?: boolean;
  isDrama?: boolean;
  link?: RouteLink;
}

export interface HeadingOn {
  click?: () => void;
}
