import { Routes } from "./src/core/Router/routes.d";
import Router from "./src/core/Router/Router.ts";

export const router = new Router();

/* Handling Browser's ⬅️ / ➡️ buttons */
window.addEventListener("popstate", (event) => {
  const path = event.state?.path || "/sign-in";
  router.routeTo(path, event);
});

/* Handling clicks on links */

const nav = document.getElementsByTagName("nav")[0];
nav?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  if (
    e.target instanceof HTMLAnchorElement &&
    e.target.classList.contains("navButton")
  ) {
    const link = e.target.getAttribute("href");
    if (link) {
      router.routeTo(link as Routes, e);
    }
  }
});

/* Handling initial page load */
router.routeTo("/profile", "initial route");
