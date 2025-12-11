import { ChatId } from "../../api/model/types.ts";

export function lsStore_lastChatId(chatId: ChatId): void {
  localStorage.setItem("lastActiveChatId", String(chatId));
}

export function lsGet_lastChatId(): ChatId | null {
  return Number(localStorage.getItem("lastActiveChatId"));
}

export function lsRemove_lastChatId(): void {
  localStorage.removeItem("lastActiveChatId");
}
