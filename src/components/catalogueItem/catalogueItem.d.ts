import {
  BaseProps,
  IComponentConfigs,
} from "../../framework/Component/Component.d";
import { TagNames } from "../../services/render/DOM/DOM.d";

export interface CatalogueItemProps extends BaseProps {
  configs: ICatalogueItemConfigs;
  attributes?: BaseProps["attributes"];
}

export interface ICatalogueItemConfigs extends IComponentConfigs {
  tagName: Extract<TagNames, "article" | "li">;
  title: string;
  contentText: string;
  date: string;
  unreadCount: string;
  avatar: string;
}
