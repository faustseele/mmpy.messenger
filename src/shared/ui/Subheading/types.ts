import { BaseProps } from "../../lib/Component/model/base.types.ts";
import { ComponentConfigs } from "../../lib/Component/model/types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface SubheadingConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "h2" | "h3" | "h4" | "h5" | "h6">;
  text: string;
}

export interface SubheadingProps extends BaseProps {
  configs: SubheadingConfigs;
}
