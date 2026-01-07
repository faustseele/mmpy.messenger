import {
  SignInRequest,
  SignUpRequest,
  UserResponse,
} from "@/shared/api/model/api.types.ts";
import { ApiError, ApiResponse } from "@/shared/api/model/types.ts";
import Store from "@app/providers/store/model/Store.ts";
import { ls_removeLastChatId } from "@shared/lib/LocalStorage/actions.ts";
import AuthAPI from "../api/AuthAPI.ts";

class AuthService {
  public async signUp(data: SignUpRequest): Promise<ApiResponse> {
    try {
      const res = await AuthAPI.signUp(data);
      const user = await AuthAPI.requestUser();
      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      console.log("", res, user, Store.getState());

      return { ok: !!user };
    } catch (e) {
      console.error("signUp failed", e);
      return { ok: false, err: e as ApiError };
    }
  }

  public async signIn(data: SignInRequest): Promise<ApiResponse> {
    try {
      const res = await AuthAPI.signIn(data);
      const user = await AuthAPI.requestUser();

      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      console.log(res, user, Store.getState());

      return { ok: !!user };
    } catch (e: unknown) {
      console.error("signIn failed", e);
      return { ok: false, err: e as ApiError };
    }
  }

  public async fetchUser(): Promise<UserResponse | ApiResponse> {
    try {
      const user = await AuthAPI.requestUser();
      if (user) {
        Store.set("api.auth.user", user);
        Store.set("controllers.isLoggedIn", true);
        console.log("user-fetch success", user);
        return user;
      } else {
        Store.set("api.auth.user", null);
        Store.set("controllers.isLoggedIn", false);
        return {
          ok: false,
          err: {
            status: 401,
            reason: "Unauthorized",
            response: "Non-API resp: User is not logged in",
          },
        };
      }
    } catch (e) {
      console.error("fetchUser failed, probably not logged in", e);
      return { ok: false, err: e as ApiError };
    }
  }

  public async logout(): Promise<ApiResponse> {
    try {
      const res = await AuthAPI.logout();
      Store.set("api.chats.activeId", null);
      Store.set("api.chats.currentChat", null);
      Store.set("api.chats.list", null);

      Store.set("controllers.isLoggedIn", false);

      /* remove last active chat */
      ls_removeLastChatId();

      console.log("", res, Store.getState());
      return { ok: !!res };
    } catch (e) {
      console.error("logout failed", e);
      return { ok: false, err: e as ApiError };
    }
  }
}

export default new AuthService();
