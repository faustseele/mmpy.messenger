import {
  BaseProps,
  ComponentConfigs,
} from "../../../framework/Component/component";
import { TagNameType } from "../../../services/render/DOM/dom";

export interface SubheadingConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "h2" | "h3" | "h4" | "h5" | "h6">;
  text: string;
}

export interface SubheadingProps extends BaseProps {
  configs: SubheadingConfigs;
  attributes?: BaseProps['attributes'];
}
