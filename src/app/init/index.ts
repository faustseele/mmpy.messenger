import { handleFetchChats } from "@/entities/chat/model/actions.ts";
import { handleLogout } from "@/features/authenticate/model/actions.ts";
import AuthService from "@/features/authenticate/model/AuthService.ts";
import { RouteLink } from "@/shared/types/universal.ts";
import Router from "../providers/router/Router.ts";
import Store from "../providers/store/model/Store.ts";

/** initilizes application; keeps Router separate */
export const initApp = async () => {
  await bootstrapAuth();
};

const bootstrapAuth = async () => {
  try {
    const res = await AuthService.fetchUser();
    if (res.ok) {
      await handleFetchChats();
    }

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
