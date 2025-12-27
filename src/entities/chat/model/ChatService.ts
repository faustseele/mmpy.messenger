import Store from "@app/providers/store/model/Store.ts";
import {
  ChatId,
  ChatResponse,
  ChatUsersQuery,
  CreateChatResponse,
  GetChatsQuery,
  UpdateChatAvatarResponse,
} from "@shared/api/model/types.ts";
import { ls_storeLastChatId } from "@/shared/lib/LocalStorage/actions.ts";
import ChatAPI from "../api/ChatAPI.ts";
import { ChatWebsocket } from "../lib/ChatWebsocket.ts";
import { lgg } from "@/shared/lib/logs/Logger.ts";

class ChatService {
  private ws = new ChatWebsocket();

  public async fetchChats(
    query?: GetChatsQuery,
  ): Promise<ChatResponse[] | undefined> {
    try {
      const list = await ChatAPI.getChats(query);
      Store.set("api.chats.list", list);
      lgg.debug("chats fetch success !:", list);

      return list;
    } catch (e) {
      lgg.error("chats fetch fail:", e);
      return;
    }
  }

  public async selectChat(chatId: number) {
    try {
      Store.set("api.chats.activeId", chatId);
      ls_storeLastChatId(chatId);

      const list = Store.getState().api.chats.list;

      /* evading api.chats.list mutation */
      const currentRaw =
        list?.find((c: ChatResponse) => c.id === chatId) ?? null;
      const current = currentRaw ? structuredClone(currentRaw) : null;
      Store.set("api.chats.currentChat", current);

      if (!current) {
        lgg.error("Current chat not found");
        return;
      }

      const user = Store.getState().api.auth.user;
      if (!user) return;

      /* closing prev socket */
      const prevId = Store.getState().api.chats.activeId;
      if (prevId && prevId !== chatId) this.ws.closeWS(prevId);

      const { token } = await ChatAPI.getToken(chatId);
      this.ws.openWS(user.id, chatId, token);

      lgg.debug("chat select success !, token:", token);
    } catch (e) {
      lgg.error("chat select failed:", e);
    }
  }

  public async createChat(
    title: string,
  ): Promise<CreateChatResponse | undefined> {
    try {
      const chat = await ChatAPI.createChat({ title });
      lgg.debug(`chat ${title} create success !:`, chat);

      return chat;
    } catch (e) {
      lgg.error("chat create failed:", e);
      return;
    }
  }

  public async updateChatAvatar(
    chatId: ChatId,
    avatar: File,
  ): Promise<UpdateChatAvatarResponse | undefined> {
    try {
      const updatedChat = await ChatAPI.updateChatAvatar(chatId, avatar);
      lgg.debug("chat avatar update success:", updatedChat);

      return updatedChat;
    } catch (e) {
      lgg.error("chat avatar update fail:", e);
      return;
    }
  }

  public async deleteChat(chatId: ChatId) {
    try {
      const delRes = await ChatAPI.deleteChat({ chatId });
      this.ws.closeWS(chatId);

      lgg.debug("chat delete success !:", delRes);
    } catch (e) {
      lgg.error("chat delete failed:", e);
    }
  }

  public async addUsers(chatId: ChatId, users: number[]) {
    try {
      const res = await ChatAPI.addUsers({ chatId, users });

      lgg.debug("users-add success:", res);
    } catch (e) {
      lgg.error("users-add failed:", e);
    }
  }

  public async removeUsers(chatId: ChatId, users: number[]) {
    try {
      const res = await ChatAPI.removeUsers({ chatId, users });

      lgg.debug("users-remove success:", res, chatId);
    } catch (e) {
      lgg.error("users-remove failed:", e);
    }
  }

  public async getUsers(chatId: ChatId, query?: ChatUsersQuery) {
    try {
      const res = await ChatAPI.getUsers(chatId, query);

      lgg.debug("users-get success:", res);
      return res;
    } catch (e) {
      lgg.error("users-get failed:", e);
      return [];
    }
  }

  public isCurrentChatNotes() {
    return Store.getState().isNotes[Store.getState().api.chats.activeId ?? 0];
  }

  public sendMessage(content: string) {
    this.ws.sendMessage(content);
  }

  public deselectChat() {
    const currId = Store.getState().api.chats.activeId;
    if (currId) this.ws.closeWS(currId);

    Store.set("api.chats.activeId", null);
    Store.set("api.chats.currentChat", null);
  }
}

export default new ChatService();
