import Handlebars from "handlebars";
import { errorData404, errorData500 } from "./data.ts";
import cssPages from "../pages.module.css";
import css from "./errors.module.css";
import { Link } from "../pages.d";

export function getErrorPage(link: Link) {
  const is404 = link === "/404";
  const is500 = link === "/500";

  const html =
    /* html */
    `
    <div class="${cssPages.moduleWindow} ${css.moduleWindow_errors}">
      <header class="${css.errorsHeadings}">
        {{> heading}}
        {{> subheading}}
      </header>

      <main>
        {{>button}}
      </main>
    </div>`;

  const compiledTemplate = Handlebars.compile(html);

  if (is404) {
    return compiledTemplate(errorData404);
  } else if (is500) {
    return compiledTemplate(errorData500);
  } else {
    console.error("Wrong link:", link);
    return compiledTemplate(errorData404);
  }
}
