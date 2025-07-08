/* eslint-disable no-unused-vars */
/* K in TLink is a type-guard */

import { pageLinks } from "./data.ts";

export type TLink =
  | "/sign-up"
  | "/sign-in"
  | "/chats"
  | "/profile"
  | "/404"
  | "/500";

type LinkRoutes = {
  [K in TLink]?: () => void;
};

export const guardLink = (link: unknown): link is TLink => {
  return typeof link === "string" && pageLinks.includes(link as TLink);
};
