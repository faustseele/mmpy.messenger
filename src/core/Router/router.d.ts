/* eslint-disable no-unused-vars */
/* Eslint doesn't like the enums */
export enum RouteLink {
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  Chats = "/chats",
  Profile = "/profile",
  NotFound = "/404",
  Error = "/500",
}

export const guardLink = (link: unknown): link is RouteLink => {
  return typeof link === "string" && pageLinks.includes(link as RouteLink);
};
