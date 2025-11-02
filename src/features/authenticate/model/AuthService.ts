import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Store from "../../../app/providers/store/Store.ts";
import ChatService from "../../../entities/chat/model/ChatService.ts";
import { SignUpRequest, SignInRequest } from "../../../shared/api/model/types.ts";
import AuthAPI from "../api/AuthAPI.ts";

class AuthService {
  public async signUp(data: SignUpRequest) {
    try {
      const resSignUp = await AuthAPI.signUp(data);
      const user = await AuthAPI.requestUser();
      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      Router.go(RouteLink.Messenger);
      console.log(resSignUp, user, Store.getState());

      /* generating one notes-chat */
      await ChatService.createChat('Заметки 📃');

    } catch (e) {
      console.error("SignUp failed:", e);
    }
  }

  public async signIn(data: SignInRequest) {
    try {
      const resSignIn = await AuthAPI.signIn(data);
      const user = await AuthAPI.requestUser();
      Store.set("api.auth.user", user);
      if (user) {
        Store.set("controllers.isLoggedIn", true);
      } else {
        Store.set("controllers.isLoggedIn", false);
      }

      Router.go(RouteLink.Messenger);
      console.log(resSignIn, user, Store.getState());
    } catch (e) {
      console.error("SignIn failed:", e);
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

  public async logout() {
    try {
      const res = await AuthAPI.logout();
      Store.set("api.chats.activeId", null);
      Store.set("api.chats.currentChat", null);
      Store.set("api.chats.list", null);

      Store.set("controllers.isLoggedIn", false);

      Router.go(RouteLink.SignIn);
      console.log(res, Store.getState());
    } catch (e) {
      console.error("Logout failed:", e);
    }
  }
}

export default new AuthService();
