import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface ToastProps extends BaseProps {
  configs: ToastConfigs;
}

interface ToastConfigs extends BaseConfigs {
  tagName: Extract<TagNameType, "div">;
  type: ToastType;
  message: string;
  /* in ms */
  duration?: number;
}

export type ToastType = "success" | "error" | "info";
