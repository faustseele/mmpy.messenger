import { ComponentConfigs } from "../../core/Component/Component.d";

export interface ICatalogueItemData extends ComponentConfigs {
  __title: string;
  __contentText: string;
  __date: string;
  __unreadCount: string;
  class?: string;
}
