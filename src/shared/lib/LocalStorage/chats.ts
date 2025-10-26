import { ChatId } from "../../api/model/types.ts";

export function store_lastChatId(chatId: ChatId): void {
  localStorage.setItem("lastActiveChatId", String(chatId));
}

export function get_lastChatId(): ChatId | null {
  return Number(localStorage.getItem("lastActiveChatId"));
}
