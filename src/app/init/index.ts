import { handleFetchChats } from "@entities/chat/model/actions.ts";
import {
  handleFetchUser,
  handleLogout,
} from "@features/authenticate/model/actions.ts";
import { RouteLink } from "@shared/types/universal.ts";
import Router from "../providers/router/Router.ts";
import Store from "../providers/store/model/Store.ts";
import { getToastNode } from "@/shared/ui/Toast/factory.ts";

/* initilizes application; keeps Router separate */
export const initApp = async () => {
  await bootstrapAuth();

  const root = document.getElementsByTagName("body")[0];

  const toast = getToastNode({
    message: "Hello World!",
  });

  if (!root || !toast.runtime?.instance.element)
    throw new Error("root element not found");

  root.prepend(toast.runtime.instance.element);
};

const bootstrapAuth = async () => {
  try {
    const user = await handleFetchUser();
    if (user) await handleFetchChats();

    const isLoggedIn = Store.getState().controllers.isLoggedIn;
    console.log("bootstrapAuth: isLoggedIn?", isLoggedIn);
  } catch (error) {
    throw new Error("bootstrapAuth failed", { cause: error });
  }
};

/** for the nav-<a> links */
export const bootstrapNavLinks = () => {
  const navs = document.getElementsByClassName(
    "navButton",
  ) as HTMLCollectionOf<HTMLAnchorElement>;

  for (const a of Array.from(navs)) {
    a.addEventListener("click", async (e: MouseEvent) => {
      e.preventDefault();

      const path = a.getAttribute("href");
      if (path === "/logout") {
        handleLogout();
      } else {
        Router.go(path as RouteLink);
      }
    });
  }
};
