import { ChatId } from "../../api/model/types.ts";

export function ls_storeLastChatId(chatId: ChatId): void {
  localStorage.setItem("lastActiveChatId", String(chatId));
}

export function ls_getLastChatId(): ChatId | null {
  return Number(localStorage.getItem("lastActiveChatId"));
}

export function ls_removeLastChatId(): void {
  localStorage.removeItem("lastActiveChatId");
}
