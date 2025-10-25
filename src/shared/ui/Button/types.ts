import { RouteLink } from "../../../app/providers/router/types.ts";
import {
  BaseAttributes,
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface ButtonProps extends BaseProps {
  configs: ButtonConfigs;
  attributes?: ButtonAttributes;
}

export interface ButtonConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "button">;
  label: string;
  isSilent?: boolean;
  link?: RouteLink;
}

export interface ButtonAttributes extends BaseAttributes {
  type?: ButtonType;
}

type ButtonType = "button" | "submit";
