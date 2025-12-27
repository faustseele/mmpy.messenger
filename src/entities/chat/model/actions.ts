import Store from "@/app/providers/store/model/Store.ts";
import {
  ChatId,
  ChatResponse,
  CreateChatResponse,
  GetChatsQuery,
} from "@/shared/api/model/types.ts";
import { ls_getLastChatId } from "@/shared/lib/LocalStorage/actions.ts";
import { lgg } from "@/shared/lib/logs/Logger.ts";
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
): Promise<CreateChatResponse | undefined> => {
  const res = await ChatService.createChat(title);

  if (res?.id) {
    const resChats = await ChatService.fetchChats();
    await ChatService.selectChat(res.id);

    if (resChats) setChatsList(resChats);

    return res;
  } else {
    lgg.error("Chat create failed");
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
  const last = Number(ls_getLastChatId());
  if (last && list?.some((chat) => chat.id === last))
    ChatService.selectChat(last);

  if (!list) {
    lgg.warn("no chats fetched", list);
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
  lgg.debug("isNotesList:", isNotesList);
  Store.set("isNotes", isNotesList);
};
