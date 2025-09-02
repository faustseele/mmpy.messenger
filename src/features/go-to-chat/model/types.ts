import {
  BaseProps,
  ComponentConfigs,
} from "../../framework/Component/component.d";
import { TagNameType } from "../../services/render/DOM/dom.d";

export interface GoToChatProps extends BaseProps {
  configs: GoToChatConfigs;
  attributes?: BaseProps["attributes"];
}

export interface GoToChatConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "article" | "li">;
  title: string;
  contentText: string;
  date: string;
  unreadCount: string;
  avatar: string;
}
