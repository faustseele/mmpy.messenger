import { IButtonData } from "../../components/button/button.d";
import { ICatalogueItemData } from "../../components/catalogueItem/catalogueItem.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { IMessageData } from "../../components/message/message.d";
import { IMessageFieldData } from "../../components/messageField/messageField.d";
import { ComponentConfigs, ComponentEvents } from "../../core/Component/Component.d";

export interface IChatPageData extends ComponentConfigs {
  headingData_chats: IHeadingData;
  headingData_goToProfile: IHeadingData;
  searchLabel: string;
  catalogueItemsData: ICatalogueItemData[];
  messageField: IMessageFieldData;
  chatData: IChatContextData;
  buttonData_delete: { 
    configs: IButtonData;
    events: ComponentEvents;
   };
  messagesData: IMessageData[];
}

export interface IChatContextData {
  participantAvatar: string /* src attribute */;
  __participantName: string;
}
