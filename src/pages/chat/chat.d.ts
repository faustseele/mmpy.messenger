import { ButtonProps } from "../../components/button/Button.ts";
import { ICatalogueItemConfigs } from "../../components/catalogueItem/catalogueItem.d";
import { IHeadingConfigs } from "../../components/heading/heading.d";
import { IMessageConfigs } from "../../components/message/message.d";
import { IMessageFieldConfigs } from "../../components/messageFieldConfigs/messageFieldConfigs.d";
import { IComponentConfigs } from "../../framework/Component/Component.d";

export interface IChatPageConfigs extends IComponentConfigs {
  headingConfigs_chats: IHeadingConfigs;
  headingConfigs_goToProfile: IHeadingConfigs;
  searchLabel: string;
  catalogueItemsConfigs: ICatalogueItemConfigs[];
  messageFieldConfigs: IMessageFieldConfigs;
  chatData: IChatContextData;
  buttonProps_delete: ButtonProps;
  messagesConfigs: IMessageConfigs[];
}

export interface IChatContextData {
  participantAvatar: string /* src attribute */;
  __participantName: string;
}
