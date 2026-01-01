import { PageId } from "@pages/page/config/const.ts";
import { AppState } from "@app/providers/store/model/Store.ts";
import { getMessagesGraph } from "@entities/message-bubble/model/factory.ts";
import { getGoToChatGraph } from "@features/go-to-chat/model/factory.ts";
import { getMessageFieldNode } from "@features/send-message/model/factory.ts";
import { API_URL_RESOURCES } from "@shared/config/urls.ts";
import { ComponentPatch } from "@shared/lib/Component/model/types.ts";
import defaultAvatar from "../../../../static/avatar.png";
import { MessengerProps } from "./types.ts";

export const mapMessengerState = (
  state: AppState,
): ComponentPatch<MessengerProps> => {
  const { currentChat, list } = state.api.chats;

  const avatar = currentChat
    ? currentChat.avatar
      ? `${API_URL_RESOURCES}${currentChat.avatar}`
      : defaultAvatar
    : "";

  const configs: MessengerProps["configs"] = {
    id: PageId.Messenger,
    tagName: "div",
    isNotes: state.isNotes[currentChat?.id ?? 0],
    chatId: currentChat?.id,
    chatTitle: currentChat?.title,
    participantName: currentChat?.title ?? "",
    participantAvatar: avatar,
  };

  const goToChatNodesPatch = getGoToChatGraph(list ?? []);

  const messageNodesPatch = getMessagesGraph();

  if (!goToChatNodesPatch.nodes) {
    console.error("goToChatNodesPatch is not defined");
  }

  const { nodes: goToChatNodes, edges: goToChatEdge } = goToChatNodesPatch;
  const { nodes: messageNodes, edges: messageEdge } = messageNodesPatch;

  return {
    configs,
    children: {
      nodes: {
        ...goToChatNodes,
        ...messageNodes,
        messageField: getMessageFieldNode("messageField"),
      },
      edges: {
        ...goToChatEdge,
        ...messageEdge,
      },
    },
  };
};
