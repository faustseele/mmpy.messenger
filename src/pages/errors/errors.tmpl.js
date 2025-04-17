import Handlebars from "handlebars";
import { errorData404, errorData500 } from "./data";
import cssPages from "../pages.module.css";
import css from "./errors.module.css";

export function getErrorPage(link) {

  const is404 = link === "/404";
  const is500 = link === "/500";

  const html =
    /* html */
    `
    <div class="${cssPages.moduleWindow} ${css.moduleWindow_errors}">
      <div class="${css.errorsHeadings}">
        {{> heading}}
        {{> subheading}}
      </div>

      {{>button}}
      
    </div>`;

  const compiledTemplate = Handlebars.compile(html);

  if (is404) {
    return compiledTemplate(errorData404)
  }
  else if (is500) {
    return compiledTemplate(errorData500)
  } else {
    console.error("Wrong link:", link);
    return compiledTemplate(errorData404)
  }
}