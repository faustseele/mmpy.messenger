import { Button, ButtonProps } from "../../components/button/Button.ts";
import { CatalogueItem, CatalogueItemProps } from "../../components/catalogueItem/CatalogueItem.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Input, InputProps } from "../../components/input/Input.ts";
import { Message, MessageProps } from "../../components/message/Message.ts";
import { MessageField, MessageFieldProps } from "../../components/messageField/MessageField.ts";
import { ChildrenPropsMap } from "../../framework/Component/children.d";
import { BaseProps, ComponentConfigs } from "../../framework/Component/component.d";

interface ChatPageProps extends BaseProps {
  configs: ChatPageConfigs;
  childrenData?: ChildrenData<ChatChildrenDataPropsMap>;
}

export interface ChatPageConfigs extends ComponentConfigs {
  participantAvatar: string;
  participantName: string;
}

export interface ChatChildrenDataPropsMap extends ChildrenPropsMap {
  heading_chats: HeadingProps;
  heading_goToProfile: HeadingProps;
  searchInput: InputProps;
  catalogueItems: CatalogueItemProps;
  deleteChatButton: ButtonProps;
  messages: MessageProps;
  messageField: MessageFieldProps;
}

export interface ChatChildrenPropsMap extends ChildrenPropsMap {
  heading_chats: Heading;
  heading_goToProfile: Heading;
  searchInput: Input;
  catalogueItems: CatalogueItem;
  deleteChatButton: Button;
  messages: Message;
  messageField: MessageField;
}
