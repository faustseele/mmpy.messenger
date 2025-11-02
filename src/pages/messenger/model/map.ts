import { AppState } from "../../../app/providers/store/Store.ts";
import { API_URL_RESOURCES } from "../../../shared/config/urls.ts";
import { ComponentPatch } from "../../../shared/lib/Component/model/types.ts";
import { MessengerProps } from "./types.ts";
import { buildGoToChatItems, buildMessageNodes } from "./utils.ts";
import defaultAvatar from "../../../../static/avatar.png";
import { getMessageFieldNode } from "../../../features/send-message/model/utils.ts";

export const mapMessengerState = (
  state: AppState,
): ComponentPatch<MessengerProps> => {
  const { currentChat, list } = state.api.chats;

  const avatar = currentChat
    ? currentChat.avatar
      ? `${API_URL_RESOURCES}${currentChat.avatar}`
      : defaultAvatar
    : "";

  const headPatch = {
    participantName: currentChat?.title ?? "",
    participantAvatar: avatar,
  };

  const goToChatNodesPatch = buildGoToChatItems(list ?? []);

  const messageNodesPatch = buildMessageNodes();

  if (!goToChatNodesPatch.goToChatNodes) {
    console.error("goToChatNodesPatch is not defined");
  }


  const { goToChatNodes, goToChatEdge } = goToChatNodesPatch;
  const { messageNodes, messageEdge } = messageNodesPatch;

  return {
    configs: {
      ...headPatch,
    },
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
