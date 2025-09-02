import Router from "../app/providers/router/Router.ts";
import { RouteLink } from "../app/providers/router/router";
import Store from "../core/Store/Store.ts";
import AuthAPI from "../framework/API/Auth/AuthAPI.ts";
import { SignInRequest, SignUpRequest } from "../entities/user/model/api";

class AuthService {
  public async signup(data: SignUpRequest) {
    try {
      const resSignup = await AuthAPI.signup(data);
      const user = await AuthAPI.request();
      Store.set("user", user);
      Store.set("isLoggedIn", true);

      console.log(resSignup, user, Store.getState());
      Router.go(RouteLink.Chats);
    } catch (e) {
      console.error("Signup failed:", e);
    }
  }

  public async signin(data: SignInRequest) {
    try {
      const resSignin = await AuthAPI.signin(data);
      const user = await AuthAPI.request();
      Store.set("user", user);
      Store.set("isLoggedIn", true);

      console.log(resSignin, user, Store.getState());
      Router.go(RouteLink.Chats);
    } catch (e) {
      console.error("Signin failed:", e);
    }
  }

  public async fetchUser() {
    try {
      const user = await AuthAPI.request();
      Store.set("user", user);
      Store.set("isLoggedIn", true);
      console.log(user);
    } catch (e) {
      console.error("Fetch user failed:", e);
    }
  }

  public async logout() {
    try {
      const res = await AuthAPI.logout();
      Store.set("user", null);
      Store.set("isLoggedIn", false);

      console.log(res, Store.getState());
      Router.go(RouteLink.SignIn);
    } catch (e) {
      console.error("Logout failed:", e);
    }
  }
}

export default new AuthService();
