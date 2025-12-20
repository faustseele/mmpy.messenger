import Router from "@/app/providers/router/Router.ts";
import UserService from "@/entities/user/model/UserService.ts";
import { RouteLink } from "@/shared/types/universal.ts";

export const handleMessengerClick = () => {
  Router.go(RouteLink.Messenger);
};

export const handleUpdateUserAvatar = async (avatar: File) => {
  await UserService.updateAvatar(avatar);
};
