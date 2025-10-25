import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Store from "../../../app/providers/store/Store.ts";
import AuthAPI from "../api/AuthAPI.ts";
import { SignUpRequest, SignInRequest } from "./types.ts";

class AuthService {
  public async signup(data: SignUpRequest) {
    try {
      const resSignup = await AuthAPI.signup(data);
      const user = await AuthAPI.request();
      Store.set("auth.user", user);
      Store.set("controllers.isLoggedIn", true);

      console.log(resSignup, user, Store.getState());
      Router.go(RouteLink.Messenger);
    } catch (e) {
      console.error("Signup failed:", e);
    }
  }

  public async signin(data: SignInRequest) {
    try {
      const resSignin = await AuthAPI.signin(data);
      const user = await AuthAPI.request();
      Store.set("auth.user", user);
      Store.set("controllers.isLoggedIn", true);

      console.log(resSignin, user, Store.getState());
      Router.go(RouteLink.Messenger);
    } catch (e) {
      console.error("Signin failed:", e);
    }
  }

  public async fetchUser() {
    try {
      const user = await AuthAPI.request();
      Store.set("auth.user", user);
      Store.set("controllers.isLoggedIn", true);
      console.log(user);
    } catch (e) {
      console.error("Fetch user failed:", e);
    }
  }

  public async logout() {
    try {
      const res = await AuthAPI.logout();
      Store.set("auth.user", null);
      Store.set("controllers.isLoggedIn", false);

      console.log(res, Store.getState());
      Router.go(RouteLink.SignIn);
    } catch (e) {
      console.error("Logout failed:", e);
    }
  }
}

export default new AuthService();
