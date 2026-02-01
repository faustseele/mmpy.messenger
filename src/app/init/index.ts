import { handleFetchChats } from "@entities/chat/model/actions.ts";
import {
  handleFetchUser,
  handleLogout,
} from "@features/authenticate/model/actions.ts";
import { RouteLink } from "@shared/types/universal.ts";
import Router from "../providers/router/Router.ts";
import Store from "../providers/store/model/Store.ts";
import { getToastNode } from "@/shared/ui/Toast/factory.ts";
import { isMobile } from "@/shared/lib/browser/isMobile.ts";

/* initilizes application; keeps Router separate */
export const initApp = async () => {
  await bootstrapAuth();

  const root = document.getElementsByTagName("body")[0];

  handleUA(root);
  initGlobalToast(root);
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

const handleUA = (root: HTMLBodyElement) => {
  const ua = navigator.userAgent;
  console.log("handleUA: ua", ua);

  if (isMobile()) root.classList.add("mobile");
};

const initGlobalToast = (root: HTMLBodyElement) => {
  const toast = getToastNode("Waiting for the bus..");

  if (!root || !toast.runtime?.instance.element)
    throw new Error("root element not found");

  /* prepending global toast */
  root.prepend(toast.runtime.instance.element);
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
