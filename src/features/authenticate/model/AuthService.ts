import { ls_removeLastChatId } from "@/shared/lib/LocalStorage/actions.ts";
import { lgg } from "@/shared/lib/logs/Logger.ts";
import Store from "@app/providers/store/model/Store.ts";
import { SignInRequest, SignUpRequest, UserResponse } from "@shared/api/model/types.ts";
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
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      lgg.debug("", res, user, Store.getState());

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
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      lgg.debug(res, user, Store.getState());

      return { ok: !!user };
    } catch (e) {
      throw new Error("SignIn failed", { cause: e });
    }
  }

  public async fetchUser(): Promise<UserResponse | undefined> {
    try {
      const user = await AuthAPI.requestUser();
      if (user) {
        Store.set("api.auth.user", user);
        Store.set("controllers.isLoggedIn", true);
        lgg.debug('user-fetch success', user);
        return user;
      } else {
        Store.set("api.auth.user", null);
        Store.set("controllers.isLoggedIn", false);
        return;
      }
    } catch (_) {
      /* user is not logged in, no error to throw */
      return;
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

      /* remove last active chat */
      ls_removeLastChatId();

      lgg.debug("", res, Store.getState());
      return { ok: !!res };
    } catch (e) {
      throw new Error("Logout failed", { cause: e });
    }
  }
}

export default new AuthService();
