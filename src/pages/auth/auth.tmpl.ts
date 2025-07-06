import cssPages from "../pages.module.css";
import css from "./auth.module.css";

export function getAuthPage(): string {
  return (
    /* html */
    `
      <header class="${css.authHeading}">
      </header>

      <main class="${css.authContent}">
        <form id="authForm" class="${css.authContent__form}">
          <div class="${css.authFooter}">
          </div>
        </form>
      </main>`
  );
}
