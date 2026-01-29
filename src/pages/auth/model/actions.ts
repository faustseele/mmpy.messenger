import { RouteLink } from "@shared/types/universal.ts";
import { AuthType } from "./types.ts";
import Router from "@/app/providers/router/Router.ts";

export const handleReroute = (type: AuthType): void => {
  Router.go(type === "sign-up" ? RouteLink.SignIn : RouteLink.SignUp);
};
