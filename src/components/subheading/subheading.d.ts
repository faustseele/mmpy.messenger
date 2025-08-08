import {
  BaseProps,
  IComponentConfigs,
} from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export interface ISubheadingConfigs extends IComponentConfigs {
  tagName: Extract<TagNames, "h2" | "h3" | "h4" | "h5" | "h6">;
  text: string;
}

export interface SubheadingProps extends BaseProps {
  configs: ISubheadingConfigs;
  attributes?: BaseProps['attributes'];
}
