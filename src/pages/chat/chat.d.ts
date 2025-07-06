import { IButtonData } from "../../components/button/button.d";
import { ICatalogueItemData } from "../../components/catalogueItem/catalogueItem.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { IMessageData } from "../../components/message/message.d";
import { IMessageFieldData } from "../../components/messageField/messageField.d";
import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IChatPageData extends ComponentConfigs {
  headingData: IHeadingData[];
  searchLabel: string;
  catalogueItemData: ICatalogueItemData[];
  messageField: IMessageFieldData;
  chatData: IChatContextData;
  buttonData: IButtonData[];
  messageData: IMessageData[];
}

export interface IChatContextData {
  participantAvatar: string; /* src attribute */
  __participantName: string;
}
