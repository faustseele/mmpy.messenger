import Handlebars from "handlebars";
import { signInData, signUpData } from "./data";
import regInput from "../../components/input/input.tmpl";
import css from "./auth.module.css";
import cssPages from "../pages.module.css";

export function getAuthPage(type) {
  regInput();

  const isSignUp = type === "/sign-up";
  const isSignIn = type === "/sign-in";

  /* Handling 1 vs 2 buttons */
  const footerModifier = isSignUp ? css.authFooter_signUp : "";

  const html =
    /* html */
    `<div class="${cssPages.moduleWindow}">
      <div class="${css.authHeading}">
        {{> heading}}
      </div>

      <div class="${css.authContent}">
        <div class="${css.authContent__list}">
          {{> input}}
        </div>
      </div>

      <div class="${css.authFooter} ${footerModifier}">
        {{> button}}
      </div>
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
