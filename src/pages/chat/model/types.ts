import { MessageProps } from "../../../entities/message-bubble/model/types.ts";
import { MessageBubble } from "../../../entities/message-bubble/ui/MessageBubble.ts";
import { GoToChatProps } from "../../../features/go-to-chat/model/types.ts";
import { GoToChat } from "../../../features/go-to-chat/ui/GoToChat.ts";
import { MessageFieldProps } from "../../../features/send-message/model/types.ts";
import { MessageField } from "../../../features/send-message/ui/MessageField.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import {
  ChildrenMap,
  ChildrenSchema,
} from "../../../shared/lib/Component/model/children.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { ButtonProps } from "../../../shared/ui/Button/types.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { HeadingProps } from "../../../shared/ui/Heading/types.ts";
import { Input, InputProps } from "../../../shared/ui/Input/Input.ts";

export interface ChatProps extends BaseProps {
  configs: {
    tagName: Extract<TagNameType, "div">;
    participantAvatar: string;
    participantName: string;
  };
}

export interface ChatMap extends ChildrenMap {
  singles: {
    heading_chats: {
      props: HeadingProps;
      instanceType: Heading;
    };
    heading_goToProfile: {
      props: HeadingProps;
      instanceType: Heading;
    };
    searchInput: {
      props: InputProps;
      instanceType: Input;
    };
    deleteChatButton: {
      props: ButtonProps;
      instanceType: Button;
    };
    messageField: {
      props: MessageFieldProps;
      instanceType: MessageField;
    };
  };
  lists: {
    messages: {
      props: MessageProps;
      instanceType: MessageBubble[];
    };
    catalogueItems: {
      props: GoToChatProps;
      instanceType: GoToChat[];
    };
  };
}

export type ChatSchema = ChildrenSchema<ChatMap>;
