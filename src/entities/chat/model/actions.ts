import Store from "@/app/providers/store/model/Store.ts";
import {
  ChatId,
  ChatResponse,
  CreateChatResponse,
  GetChatsQuery,
} from "@/shared/api/model/types.ts";
import { lsGet_lastChatId } from "@/shared/lib/LocalStorage/chats.ts";
import ChatService from "./ChatService.ts";
import { isChatNotes } from "./utils.ts";

export const handleCreateChat = async (
  title: string,
): Promise<CreateChatResponse | undefined> => {
  const res = await ChatService.createChat(title);

  if (res?.id) {
    const resChats = await ChatService.fetchChats();
    await ChatService.selectChat(res.id);

    if (resChats) setChatsList(resChats);

    return res;
  } else {
    console.error("Chat create failed");
    return;
  }
};

export const handleDeleteChat = async (id: number) => {
  await ChatService.deleteChat(id);
  ChatService.deselectChat();
  
  const resChats = await ChatService.fetchChats();
  if (resChats) setChatsList(resChats);
};

export const handleFetchChats = async (query?: GetChatsQuery) => {
  const list = await ChatService.fetchChats(query);

  /* auto-restore last active chat */
  const last = Number(lsGet_lastChatId());
  if (last && list?.some((chat) => chat.id === last))
    ChatService.selectChat(last);

  if (!list) {
    console.warn("no chats fetched", list);
    return;
  }

  setChatsList(list);
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

export const setChatsList = async (list: ChatResponse[]) => {
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
};
