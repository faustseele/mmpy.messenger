/* eslint-disable no-unused-vars */
/* K in Link is a type-guard */

import { pageLinks } from "./data.ts";

export type Link =
  | "/sign-up"
  | "/sign-in"
  | "/chats"
  | "/profile"
  | "/404"
  | "/500";

type LinkRoutes = {
  [K in Link]?: () => void;
};

export const guardLink = (link: unknown): link is Link => {
  return typeof link === "string" && pageLinks.includes(link as Link);
};
