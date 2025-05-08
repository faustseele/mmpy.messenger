import Handlebars from "handlebars";
import { signInData, signUpData } from "./data.ts";
import regInput from "../../components/input/input.tmpl";
import css from "./auth.module.css";
import cssPages from "../pages.module.css";
import { getErrorPage } from "../errors/errors.tmpl";
import { Link } from "../pages.d";

export function getAuthPage(type: Link) {
  regInput();

  const isSignUp = type === "/sign-up";
  const isSignIn = type === "/sign-in";

  /* Handling 1 vs 2 buttons */
  const footerModifier = isSignUp ? css.authFooter_signUp : "";

  const html =
    /* html */
    `<div class="${cssPages.moduleWindow}">
      <header class="${css.authHeading}">
        {{> heading}}
      </header>

      <main class="${css.authContent}">
        <div class="${css.authContent__list}">
          {{> input}}
        </div>
      </main>

      <footer class="${css.authFooter} ${footerModifier}">
        {{> button}}
      </footer>
    </div>`;

  const compiledTemplate = Handlebars.compile(html);

  if (isSignUp) {
    return compiledTemplate(signUpData);
  } else if (isSignIn) {
    return compiledTemplate(signInData);
  } else {
    console.error("Wrong page type:", type);
    return getErrorPage("/404");
  }
}
