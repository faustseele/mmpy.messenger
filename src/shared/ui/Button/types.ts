import { ChildrenNodes } from "@/shared/lib/Component/model/children.types.ts";
import {
  BaseAttributes,
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";
import { RouteLink } from "../../types/universal.ts";

export interface ButtonProps extends BaseProps {
  configs: ButtonConfigs;
  attributes?: ButtonAttributes;
}

export interface ButtonConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "button">;
  label: string;
  isSilent?: boolean;
  link?: RouteLink;
  showSpinner?: boolean;
}

export interface ButtonAttributes extends BaseAttributes {
  type?: ButtonType;
  title?: string;
}

type ButtonType = "button" | "submit";

export type ButtonNodes = ChildrenNodes<'spinner'>;
