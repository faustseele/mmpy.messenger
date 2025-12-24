import Store from "@app/providers/store/model/Store.ts";
import {
  ChatId,
  ChatResponse,
  ChatUsersQuery,
  CreateChatResponse,
  GetChatsQuery,
} from "@shared/api/model/types.ts";
import {
  lsGet_lastChatId,
  lsStore_lastChatId,
} from "@shared/lib/LocalStorage/chats.ts";
import ChatAPI from "../api/ChatAPI.ts";
import { ChatWebsocket } from "../lib/ChatWebsocket.ts";
import { isChatNotes } from "./utils.ts";

class ChatService {
  private ws = new ChatWebsocket();

  public async fetchChats(query?: GetChatsQuery) {
    try {
      const list = await ChatAPI.getChats(query);
      Store.set("api.chats.list", list);

      /* auto-restore last active chat */
      const last = Number(lsGet_lastChatId());
      if (last && list?.some((chat) => chat.id === last)) this.selectChat(last);

      /* set isNotes for each chat */
      await Promise.all(
        list?.map(async (chat) => {
          const is = await isChatNotes(chat.id);
          Store.set("isNotes", { [chat.id]: is });
          return is;
        }),
      );

      console.log("chats fetch success !:", list);
    } catch (e) {
      console.error("chats fetch fail:", e);
    }
  }

  public async selectChat(chatId: number) {
    try {
      Store.set("api.chats.activeId", chatId);
      lsStore_lastChatId(chatId);

      const list = Store.getState().api.chats.list;

      /* evading api.chats.list mutation */
      const currentRaw =
        list?.find((c: ChatResponse) => c.id === chatId) ?? null;
      const current = currentRaw ? structuredClone(currentRaw) : null;
      Store.set("api.chats.currentChat", current);

      if (!current) {
        console.error("Current chat not found");
        return;
      }

      const user = Store.getState().api.auth.user;
      if (!user) return;

      /* closing prev socket */
      const prevId = Store.getState().api.chats.activeId;
      if (prevId && prevId !== chatId) this.ws.closeWS(prevId);

      const { token } = await ChatAPI.getToken(chatId);
      this.ws.openWS(user.id, chatId, token);

      console.log("chat select success !, token:", token);
    } catch (e) {
      console.error("chat select failed:", e);
    }
  }

  public async createChat(
    title: string,
  ): Promise<CreateChatResponse | undefined> {
    try {
      return await ChatAPI.createChat({ title });
    } catch (e) {
      console.error("chat create failed:", e);
      return;
    }
  }

  public async updateChatAvatar(chatId: ChatId, avatar: File) {
    try {
      const updatedChat = await ChatAPI.updateChatAvatar(chatId, avatar);

      console.log("chat avatar update success:", updatedChat);

      this.fetchChats();
    } catch (e) {
      console.error("chat avatar update fail:", e);
    }
  }

  public async deleteChat(chatId: ChatId) {
    try {
      const delRes = await ChatAPI.deleteChat({ chatId });
      this.ws.closeWS(chatId);

      await this.fetchChats();
      console.log("chat delete success !:", delRes);

      this.deselectChat();
    } catch (e) {
      console.error("chat delete failed:", e);
    }
  }

  public async addUsers(chatId: ChatId, users: number[]) {
    try {
      const res = await ChatAPI.addUsers({ chatId, users });

      console.log("users-add success:", res);
    } catch (e) {
      console.error("users-add failed:", e);
    }
  }

  public async removeUsers(chatId: ChatId, users: number[]) {
    try {
      const res = await ChatAPI.removeUsers({ chatId, users });

      console.log("users-remove success:", res);

      await this.fetchChats();
    } catch (e) {
      console.error("users-remove failed:", e);
    }
  }

  public async getUsers(chatId: ChatId, query?: ChatUsersQuery) {
    try {
      const res = await ChatAPI.getUsers(chatId, query);

      console.log("users-get success:", res);
      return res;
    } catch (e) {
      console.error("users-get failed:", e);
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
