import {
  ChatId,
  ChatResponse,
  CreateChatResponse,
  GetChatsQuery,
} from "@/shared/api/model/api.types.ts";
import { ApiResponse } from "@/shared/api/model/types.ts";
import Store from "@app/providers/store/model/Store.ts";
import { ls_getLastChatId } from "@shared/lib/LocalStorage/actions.ts";
import ChatService from "./ChatService.ts";
import { isChatNotes } from "./utils.ts";

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
    const resChats = await ChatService.fetchChats();
    await ChatService.selectChat(res.data!.id);

    if (resChats.ok) setChatsList(resChats.data!);
  }

  return res;
};

export const handleDeleteChat = async (id: number) => {
  await ChatService.deleteChat(id);
  ChatService.deselectChat();

  const resChats = await ChatService.fetchChats();
  
  if (resChats.ok) setChatsList(resChats.data!);
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

  setChatsList(list!);

  return resList;
};

export const handleRemoveUsers = async (id: ChatId, users: number[]) => {
  await ChatService.removeUsers(id, users);
  await ChatService.fetchChats();
};

export const handleSelectChat = async (id: number) => {
  await ChatService.selectChat(id);
};

export const handleUpdateChatAvatar = async (id: ChatId, avatar: File) => {
  await ChatService.updateChatAvatar(id, avatar);
  await ChatService.fetchChats();
};

export const setChatsList = async (
  list: ChatResponse[],
): Promise<ApiResponse<Record<number, boolean>>> => {
  /* set isNotes for each chat */
  const isNotesList: Record<ChatId, boolean> = {};
  await Promise.all(
    list?.map(async (chat) => {
      const is = await isChatNotes(chat.id);
      isNotesList[chat.id] = is;
    }),
  );
  console.log("isNotesList:", isNotesList);
  Store.set("isNotes", isNotesList);

  return { ok: true, data: isNotesList };
};
