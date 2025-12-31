import Router from "@app/providers/router/Router.ts";
import {
  handleCreateChat,
  handleFetchChats,
} from "@entities/chat/model/actions.ts";
import { UserResponse } from "@shared/api/model/types.ts";
import { ls_removeLastChatId } from "@shared/lib/LocalStorage/actions.ts";
import { lgg } from "@shared/lib/logs/Logger.ts";
import { RouteLink } from "@shared/types/universal.ts";
import AuthService from "./AuthService.ts";
import { SignInData, SignUpData } from "./types.ts";

export const handleFetchUser = async (): Promise<UserResponse | undefined> => {
  const res = await AuthService.fetchUser();
  if (!res) ls_removeLastChatId();
  return res;
};

export const handleSignUp = async (
  data: SignUpData,
): Promise<{ ok: boolean }> => {
  const res = await AuthService.signUp(data);
  if (res.ok) {
    /* fetch chats on successful signup */
    Router.go(RouteLink.Messenger);

    /* generating one notes-chat */
    handleCreateChat("Заметки 📃");

    return { ok: true };
  } else {
    lgg.error("SignUp failed");

    return { ok: false };
  }
};

export const handleSignIn = async (
  data: SignInData,
): Promise<{ ok: boolean }> => {
  const res = await AuthService.signIn(data);

  if (res.ok) {
    /* fetch chats on successful login */
    handleFetchChats();
    Router.go(RouteLink.Messenger);

    return { ok: true };
  } else {
    lgg.error("SignIn failed");

    return { ok: false };
  }
};

export const handleLogout = async (): Promise<{ ok: boolean }> => {
  const res = await AuthService.logout();
  if (res.ok) {
    Router.go(RouteLink.SignIn);
    return { ok: true };
  } else {
    Router.go(RouteLink.Error);
    lgg.error("Logout failed");
    return { ok: false };
  }
};
