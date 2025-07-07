import { TLink } from "./src/pages/pages.ts";
import { routeTo } from "./src/utils/router.ts";

/* Handling Browser's ⬅️ / ➡️ buttons */
window.addEventListener("popstate", (event) => {
  const path = event.state?.path || "/sign-in";
  routeTo(path, event);
});

/* Handling clicks on links */
document.addEventListener("click", (e: Event) => {
  if (
    e.target instanceof HTMLAnchorElement &&
    e.target.classList.contains("navButton")
  ) {
    const link = e.target.getAttribute("href");
    if (link) {
      routeTo(link as TLink, e);
    }
  }
});

/* Handling initial page load */
routeTo("/sign-up", "initial route");
