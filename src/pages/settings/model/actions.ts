import Router from "@/app/providers/router/Router.ts";
import UserService from "@/entities/user/model/UserService.ts";
import AuthService from "@/features/authenticate/model/AuthService.ts";
import { RouteLink } from "@/shared/types/universal.ts";

export const handleUpdateUserAvatar = async (avatar: File) => {
  await UserService.updateAvatar(avatar);
};

export const handleLogout = async () => {
  const res = await AuthService.logout();
  if (res.ok) {
    Router.go(RouteLink.SignIn);
  } else {
    console.error("Logout failed");
    Router.go(RouteLink.Error);
  }
};
