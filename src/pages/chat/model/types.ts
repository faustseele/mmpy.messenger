import { Button, ButtonProps } from "../../components/button/Button.ts";
import { GoToChat, GoToChatProps } from "../../components/goToChat/GoToChat.ts";
import { Heading, HeadingProps } from "../../components/heading/Heading.ts";
import { Input, InputProps } from "../../components/input/Input.ts";
import { MessageBubble, MessageProps } from "../../../entities/message-bubble/ui/MessageBubble.ts";
import { MessageField, MessageFieldProps } from "../../../features/send-message/ui/MessageField.ts";
import { ChildrenDataMap } from "../../framework/Component/children.d";
import { BaseProps, ComponentConfigs } from "../../framework/Component/component.d";

interface ChatPageProps extends BaseProps {
  configs: ChatPageConfigs;
  childrenData?: ChildrenData<ChatChildrenDataPropsMap>;
}

export interface ChatPageConfigs extends ComponentConfigs {
  participantAvatar: string;
  participantName: string;
}

export interface ChatChildrenDataPropsMap extends ChildrenDataMap {
  heading_chats: HeadingProps;
  heading_goToProfile: HeadingProps;
  searchInput: InputProps;
  catalogueItems: GoToChatProps;
  deleteChatButton: ButtonProps;
  messages: MessageProps;
  messageField: MessageFieldProps;
}

export interface ChatChildrenPropsMap extends ChildrenDataMap {
  heading_chats: Heading;
  heading_goToProfile: Heading;
  searchInput: Input;
  catalogueItems: GoToChat;
  deleteChatButton: Button;
  messages: MessageBubble;
  messageField: MessageField;
}
