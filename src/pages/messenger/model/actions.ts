import Router from "@/app/providers/router/Router.ts";
import UserService from "@/entities/user/model/UserService.ts";
import { RouteLink } from "@/shared/types/universal.ts";

export const handleFindUser = async (login: string) => {
  return await UserService.findByLogin(login);
};

export const handleGoToSettings = () => {
  Router.go(RouteLink.Settings);
};

