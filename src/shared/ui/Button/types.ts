import { ChildrenNodes } from "@/shared/lib/Component/model/children.types.ts";
import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";
import { RouteLink } from "../../types/universal.ts";

export interface ButtonProps extends BaseProps {
  configs: ButtonConfigs;
}

export interface ButtonConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "button">;
  type: ButtonType;
  classNames: string;
  label: string;
  title?: string;
  isSilent?: boolean;
  link?: RouteLink;
  showSpinner?: boolean;
}

type ButtonType = "button" | "submit";

export type ButtonNodes = ChildrenNodes<"spinner">;
