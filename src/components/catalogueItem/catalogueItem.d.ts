import {
  BaseProps,
  ComponentConfigs,
} from "../../framework/Component/component.d";
import { TagNameType } from "../../services/render/DOM/dom.d";

export interface CatalogueItemProps extends BaseProps {
  configs: CatalogueItemConfigs;
  attributes?: BaseProps["attributes"];
}

export interface CatalogueItemConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "article" | "li">;
  title: string;
  contentText: string;
  date: string;
  unreadCount: string;
  avatar: string;
}
