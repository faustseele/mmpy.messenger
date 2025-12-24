import Router from "@/app/providers/router/Router.ts";
import ChatService from "@/entities/chat/model/ChatService.ts";
import { RouteLink } from "@/shared/types/universal.ts";
import AuthService from "./AuthService.ts";
import { SignInData, SignUpData } from "./types.ts";

export const handleSignUp = async (data: SignUpData) => {
  const res = await AuthService.signUp(data);
  if (res.ok) {
    /* fetch chats on successful signup */
    ChatService.fetchChats();
    Router.go(RouteLink.Messenger);

    /* generating one notes-chat */
    ChatService.createChat("Заметки 📃");
  } else {
    console.error("SignUp failed");
  }
};

export const handleSignIn = async (data: SignInData) => {
  const res = await AuthService.signIn(data);

  if (res.ok) {
    /* fetch chats on successful login */
    ChatService.fetchChats();
    Router.go(RouteLink.Messenger);
  } else {
    console.error("SignIn failed");
  }
};

export const handleLogout = async () => {
  const res = await AuthService.logout();
  if (res.ok) {
    Router.go(RouteLink.SignIn);
  } else {
    Router.go(RouteLink.Error);
    console.error("Logout failed");
  }
};
