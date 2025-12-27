import Router from "@/app/providers/router/Router.ts";
import {
  handleCreateChat,
  handleFetchChats,
} from "@/entities/chat/model/actions.ts";
import { UserResponse } from "@/shared/api/model/types.ts";
import { ls_removeLastChatId } from "@/shared/lib/LocalStorage/actions.ts";
import { lgg } from "@/shared/lib/logs/Logger.ts";
import { RouteLink } from "@/shared/types/universal.ts";
import AuthService from "./AuthService.ts";
import { SignInData, SignUpData } from "./types.ts";

export const handleFetchUser = async (): Promise<UserResponse | undefined> => {
  const res = await AuthService.fetchUser();
  if (!res) ls_removeLastChatId();
  return res;
};

export const handleSignUp = async (data: SignUpData) => {
  const res = await AuthService.signUp(data);
  if (res.ok) {
    /* fetch chats on successful signup */
    Router.go(RouteLink.Messenger);

    /* generating one notes-chat */
    handleCreateChat("Заметки 📃");
  } else {
    lgg.error("SignUp failed");
  }
};

export const handleSignIn = async (data: SignInData) => {
  const res = await AuthService.signIn(data);

  if (res.ok) {
    /* fetch chats on successful login */
    handleFetchChats();
    Router.go(RouteLink.Messenger);
  } else {
    lgg.error("SignIn failed");
  }
};

export const handleLogout = async () => {
  const res = await AuthService.logout();
  if (res.ok) {
    Router.go(RouteLink.SignIn);
  } else {
    Router.go(RouteLink.Error);
    lgg.error("Logout failed");
  }
};
