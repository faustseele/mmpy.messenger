import Store from "../../../app/providers/store/Store.ts";
import {
  ChatId,
  ChatResponse,
  ChatUsersQuery,
  GetChatsQuery,
} from "../../../shared/api/model/types.ts";
import ChatAPI from "../api/ChatAPI.ts";
import { ChatWs } from "../lib/ChatWs.ts";

class ChatService {
  private ws = new ChatWs();

  public async fetchChats(query?: GetChatsQuery) {
    try {
      const list = await ChatAPI.getChats(query);
      Store.set("api.chats.list", list);
      console.log("Chats fetched successfully:", list);
    } catch (e) {
      console.error("Chats fetch failed:", e);
    }
  }

  public async selectChat(chatId: number) {
    try {
      Store.set("api.chats.activeId", chatId);

      const list = Store.getState().api.chats.list;
      const current = list?.find((c: ChatResponse) => c.id === chatId) ?? null;
      Store.set("api.chats.currentChat", current);

      const user = Store.getState().api.auth.user;
      if (!user) return;

      const { token } = await ChatAPI.getToken(chatId);
      this.ws.openWS(user.id, chatId, token);

      console.log("Chat selected successfully, token:", token);
    } catch (e) {
      console.error("Chat select failed:", e);
    }
  }

  public async createChat(title: string) {
    try {
      await ChatAPI.createChat({ title });
      await this.fetchChats();
    } catch (e) {
      console.error("createChat failed:", e);
    }
  }

  public async deleteChat(chatId: ChatId) {
    try {
      await ChatAPI.deleteChat({ chatId });
      this.ws.closeWS(chatId);
      const { activeId } = Store.getState().api.chats;
      if (activeId === chatId) {
        Store.set("api.chats.activeId", null);
        Store.set("api.chats.currentChat", null);
      }
      await this.fetchChats();
    } catch (e) {
      console.error("deleteChat failed:", e);
    }
  }

    public async addUsers(chatId: ChatId, users: number[]) {
    try {
      await ChatAPI.addUsers({ chatId, users });
    } catch (e) {
      console.error("addUsers failed:", e);
    }
  }

  public async removeUsers(chatId: ChatId, users: number[]) {
    try {
      await ChatAPI.removeUsers({ chatId, users });
    } catch (e) {
      console.error("removeUsers failed:", e);
    }
  }

  public async getUsers(chatId: ChatId, query?: ChatUsersQuery) {
    try {
      return await ChatAPI.getUsers(chatId, query);
    } catch (e) {
      console.error("getUsers failed:", e);
      return [];
    }
  }

}

export default new ChatService();
