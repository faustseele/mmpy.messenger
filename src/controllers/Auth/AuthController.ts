import Router from "../../core/Router/Router.ts";
import { RouteLink } from "../../core/Router/router.d";
import AuthAPI from "../../framework/API/Auth/AuthAPI.ts";
import { SignInRequest, SignUpRequest } from "../../framework/API/api.d";
import AuthStateController from "./AuthStateController.ts"; // Renamed for clarity

class AuthController {
  public async signup(data: SignUpRequest) {
    try {
      const resSignup = await AuthAPI.signup(data);
      const user = await AuthAPI.request();
      console.log(resSignup, user);
      AuthStateController.setLoginStatus(true);

      Router.go(RouteLink.Chats);
    } catch (e) {
      console.error("Signup failed:", e);
    }
  }

  public async signin(data: SignInRequest) {
    try {
      const resSignin = await AuthAPI.signin(data);
      const user = await AuthAPI.request();
      console.log(resSignin, user);
      AuthStateController.setLoginStatus(true);

      Router.go(RouteLink.Chats);
    } catch (e) {
      console.error("Signin failed:", e);
    }
  }

  public async fetchUser() {
    try {
      const user = await AuthAPI.request();
      console.log(user);
    } catch (e) {
      console.error("Fetch user failed:", e);
    }
  }

  public async logout() {
    try {
      const res = await AuthAPI.logout();
      AuthStateController.setLoginStatus(false);
      console.log(res);
      Router.go(RouteLink.SignIn);
    } catch (e) {
      console.error("Logout failed:", e);
    }
  }
}

export default new AuthController();
