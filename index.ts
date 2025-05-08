import regButton from "./src/components/button/button.tmpl";
import regHeading from "./src/components/heading/heading.tmpl";
import regSubheading from "./src/components/subheading/subheading.tmpl";
import { guardLink, Link } from "./src/pages/pages.d";
import { getPage } from "./src/pages/utils.ts";

const app: HTMLElement | null = document.getElementById("app");

(function regUniversalPartials() {
  regHeading();
  regSubheading();
  regButton();
})();

// Initial render
routeTo("/chats");

// React on new address
document.addEventListener("click", (e: Event) => {
  // Checking if the event caused by a click on an <a> tag
  if (
    e.target instanceof HTMLElement &&
    e.target.classList?.contains("newRoute")
  ) {
    e.preventDefault();

    const link = e.target.getAttribute("href");

    if (!guardLink(link)) {
      console.error("link is null");
      return;
    }

    routeTo(link);
  }
});

/*
  Rendering modules (pages) based on the current address
  Available adresses:
  - sign-up
  - sign-in
*/
function routeTo(link: Link) {
  if (!app) {
    console.error("app is null");
    return;
  }

  const page = getPage(link);

  app.innerHTML = page;

  // Updating URL without reloading
  window.history.pushState({}, "", link);
}
