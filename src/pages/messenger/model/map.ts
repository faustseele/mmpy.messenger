import { API_URL_RESOURCES } from "@/shared/config/urls.ts";
import { AppState } from "@app/providers/store/model/Store.ts";
import { getMessagesGraph } from "@entities/message-bubble/model/factory.ts";
import { getGoToChatGraph } from "@features/go-to-chat/model/factory.ts";
import { ComponentPatch } from "@shared/lib/Component/model/types.ts";
import defaultAvatar from "../../../../static/avatar.png";
import { getBaseMessengerConfigs } from "../config/params.ts";
import { MessengerProps, MessengerType } from "./types.ts";

export const mapMessengerState = (
  state: AppState,
): ComponentPatch<MessengerProps> => {
  const { currentChat, list, activeId, messagesByChatId } = state.api.chats;

  /* loading if there's an active chat but no msgs loaded yet */
  const isLoadingMessages = activeId ? !messagesByChatId[activeId] : false;
  const hasMessages = activeId
    ? (messagesByChatId[activeId]?.length ?? 0) > 0
    : false;

  const type = ((): MessengerType => {
    if (!activeId) return "stub";

    if (!currentChat?.type) {
      console.error("currentChat.type is not defined", currentChat);
      return "stub";
    }

    return currentChat.type;
  })();

  const info = {
    type,
    chatId: currentChat?.id ?? 0,
    chatTitle: currentChat?.title ?? "",
    chatAvatar: currentChat?.avatar
      ? `${API_URL_RESOURCES}${currentChat.avatar}`
      : defaultAvatar,
  };

  const updatedConfigs = getBaseMessengerConfigs(
    info,
    isLoadingMessages,
    hasMessages,
  );

  const goToChatPatch = getGoToChatGraph(list ?? []);

  const messagesPatch = getMessagesGraph();

  if (!goToChatPatch.nodes) {
    console.error("goToChatNodesPatch is not defined");
  }

  return {
    configs: updatedConfigs,
    children: {
      nodes: {
        ...goToChatPatch.nodes,
        ...messagesPatch.nodes,
      },
      edges: {
        ...goToChatPatch.edges,
        ...messagesPatch.edges,
      },
    },
  };
};
