import Store from "../../../app/providers/store/Store.ts";
import {
  ChatId,
  ChatResponse,
  ChatUsersQuery,
  GetChatsQuery,
} from "../../../shared/api/model/types.ts";
import { store_lastChatId } from "../../../shared/lib/LocalStorage/chats.ts";
import ChatAPI from "../api/ChatAPI.ts";
import { ChatWebsocket } from "../lib/ChatWebsocket.ts";

class ChatService {
  private ws = new ChatWebsocket();

  public async fetchChats(query?: GetChatsQuery) {
    try {
      const list = await ChatAPI.getChats(query);
      Store.set("api.chats.list", list);

      /* auto-restore last active chat */
      const last = Number(localStorage.getItem("lastActiveChatId"));
      if (last && list?.some((chat) => chat.id === last)) this.selectChat(last);

      console.log("chats fetch success !:", list);
    } catch (e) {
      console.error("chats fetch fail:", e);
    }
  }

  public async selectChat(chatId: number) {
    try {
      Store.set("api.chats.activeId", chatId);
      store_lastChatId(chatId);

      const list = Store.getState().api.chats.list;

      /* evading api.chats.list mutation */
      const currentRaw =
        list?.find((c: ChatResponse) => c.id === chatId) ?? null;
      const current = currentRaw ? structuredClone(currentRaw) : null;
      Store.set("api.chats.currentChat", current);

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

  public async createChat(title: string) {
    try {
      const resChat = await ChatAPI.createChat({ title });
      const resChats = await this.fetchChats();
      this.selectChat(resChat.id);

      console.log(`chat ${title} create success !:`, resChat, resChats);
    } catch (e) {
      console.error("chat create failed:", e);
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

  public sendMessage(content: string) {
    this.ws.sendMessage(content);
  }

  public deselectChat() {
    const currId = Store.getState().api.chats.activeId;
    if (currId) this.ws.closeWS(currId);

    Store.set("api.chats.activeId", null);
    Store.set("api.chats.currentChat", null);

    console.log("deselect chat");
  }
}

export default new ChatService();
