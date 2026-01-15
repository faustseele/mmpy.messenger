import {
  BaseConfigs,
  BaseProps,
} from "../../lib/Component/model/base.types.ts";
import { RootTag } from "../../lib/DOM/types.ts";

export interface ToastProps extends BaseProps {
  configs: ToastConfigs;
}

interface ToastConfigs extends BaseConfigs {
  rootTag: Extract<RootTag, "span">;
  type: ToastType;
  message: string;
  /* in ms */
  duration?: number;
}

export type ToastPayload = {
  message: string;
  type: ToastType;
}

export type ToastType = "success" | "error" | "info";
