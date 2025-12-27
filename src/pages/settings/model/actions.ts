import Router from "@app/providers/router/Router.ts";
import { RouteLink } from "@shared/types/universal.ts";

export const handleMessengerClick = () => {
  Router.go(RouteLink.Messenger);
};
