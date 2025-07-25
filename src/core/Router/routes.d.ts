/* eslint-disable no-unused-vars */
/* K in Routes is a type-guard */

export enum Routes {
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  Chats = "/chats",
  Profile = "/profile",
  NotFound = "/404",
  Error = "/500",
}

type LinkRoutes = {
  [K in Routes]?: () => void;
};

export const guardLink = (link: unknown): link is Routes => {
  return typeof link === "string" && pageLinks.includes(link as Routes);
};
