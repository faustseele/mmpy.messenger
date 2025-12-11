import Store from "@app/providers/store/model/Store.ts";
import ChatService from "@entities/chat/model/ChatService.ts";
import { SignInRequest, SignUpRequest } from "@shared/api/model/types.ts";
import AuthAPI from "../api/AuthAPI.ts";

class AuthService {
  public async signUp(data: SignUpRequest): Promise<{
    ok: boolean;
  }> {
    try {
      const res = await AuthAPI.signUp(data);
      const user = await AuthAPI.requestUser();
      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
        ChatService.fetchChats();
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      /* generating one notes-chat */
      await ChatService.createChat("Заметки 📃");

      console.log(res, user, Store.getState());

      return { ok: !!user };
    } catch (e) {
      throw new Error("SignUp failed", { cause: e });
    }
  }

  public async signIn(data: SignInRequest): Promise<{
    ok: boolean;
  }> {
    try {
      const res = await AuthAPI.signIn(data);
      const user = await AuthAPI.requestUser();
      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
        ChatService.fetchChats();
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      console.log(res, user, Store.getState());

      return { ok: !!user };
    } catch (e) {
      throw new Error("SignIn failed", { cause: e });
    }
  }

  public async fetchUser() {
    try {
      const user = await AuthAPI.requestUser();
      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
        console.log(user);
      } else {
        Store.set("controllers.isLoggedIn", false);
      }
    } catch (e) {
      console.error("Fetch user failed:", e);
    }
  }

  public async logout(): Promise<{
    ok: boolean;
  }> {
    try {
      const res = await AuthAPI.logout();
      Store.set("api.chats.activeId", null);
      Store.set("api.chats.currentChat", null);
      Store.set("api.chats.list", null);

      Store.set("controllers.isLoggedIn", false);

      console.log(res, Store.getState());
      return { ok: !!res };
    } catch (e) {
      throw new Error("Logout failed", { cause: e });
    }
  }
}

export default new AuthService();
