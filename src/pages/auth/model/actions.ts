import Router from "@app/providers/router/Router.ts";
import { RouteLink } from "@shared/types/universal.ts";

export const handleReroute = (link: RouteLink) => {
  Router.go(link);
};
