import regButton from "./src/components/button/button.tmpl.js";
import regHeading from "./src/components/heading/heading.tmpl.js";
import regSubheading from "./src/components/subheading/subheading.tmpl.js";
import { getPage } from "./src/pages/utils.js";

(function regUniversalPartials() {
  regHeading();
  regSubheading()
  regButton();
})()

// Initial render
routeTo('/profile')

// React on new address
document.addEventListener("click", (e) => {

  // Checking if the event caused by a click on an <a> tag
  if (e.target.classList.contains("newRoute")) {
    e.preventDefault();

    const link = event.target.getAttribute("href");
    routeTo(link);
  }
});


/*
  Rendering modules (pages) based on the current address
  Available adresses:
  - sign-up
  - sign-in
*/
function routeTo(link) {
  const page = getPage(link);

  app.innerHTML = page;

  // Updating URL without reloading
  window.history.pushState({}, "", link);
}
