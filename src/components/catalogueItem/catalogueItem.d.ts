import { IComponentConfigs } from "../../framework/Component/Component.d";

export interface ICatalogueItemConfigs extends IComponentConfigs {
  __title: string;
  __contentText: string;
  __date: string;
  __unreadCount: string;
  class?: string;
}
