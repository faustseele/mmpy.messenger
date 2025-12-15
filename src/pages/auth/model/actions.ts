import Router from "@/app/providers/router/Router.ts";
import { RouteLink } from "@/shared/types/universal.ts";

export const handleReroute = (type: string) => {
  if (type === "sign-in") {
    Router.go(RouteLink.SignIn);
  } else if (type === "sign-up") {
    Router.go(RouteLink.SignUp);
  }
};
