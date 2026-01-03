import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface ToastProps extends BaseProps {
  configs: ToastConfigs;
}

export interface ToastConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "div">;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number; // in milliseconds
}

export type ToastType = ToastConfigs["type"];
