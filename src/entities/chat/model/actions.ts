import {
  ChatId,
  ChatResponse,
  CreateChatResponse,
  GetChatsQuery,
} from "@/shared/api/model/api.types.ts";
import { ApiResponse } from "@/shared/api/model/types.ts";
import { ls_getLastChatId } from "@shared/lib/LocalStorage/actions.ts";
import ChatService from "./ChatService.ts";

export const handleAddUsers = async (id: ChatId, users: number[]) => {
  await ChatService.addUsers(id, users);
};

export const handleCloseChat = () => {
  ChatService.deselectChat();
};

export const handleCreateChat = async (
  title: string,
): Promise<ApiResponse<CreateChatResponse>> => {
  const res = await ChatService.createChat(title);

  if (res.ok) {
    await ChatService.fetchChats();
    await ChatService.selectChat(res.data!.id);
  }

  return res;
};

export const handleDeleteChat = async (id: number) => {
  await ChatService.deleteChat(id);
  ChatService.deselectChat();

  await ChatService.fetchChats();
  
};

export const handleFetchChats = async (
  query?: GetChatsQuery,
): Promise<ApiResponse<ChatResponse[]>> => {
  const resList = await ChatService.fetchChats(query);

  if (!resList.ok) return resList;

  const list = resList.data;

  /* auto-restore last active chat */
  const last = Number(ls_getLastChatId());
  if (last && list!.some((chat) => chat.id === last))
    ChatService.selectChat(last);

  return resList;
};

export const handleRemoveUsers = async (id: ChatId, users: number[]) => {
  await ChatService.removeUsers(id, users);
  await ChatService.fetchChats();
};

export const handleSelectChat = async (id: number) => {
  await ChatService.selectChat(id);
};

export const handleUpdateChatAvatar = async (id: ChatId, file: File): Promise<void> => {
  await ChatService.updateChatAvatar(id, file);
  await ChatService.fetchChats();
};
