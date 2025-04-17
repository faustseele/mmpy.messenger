import Handlebars from "handlebars";
import css from "./heading.module.css";

export default function regHeading() {
  Handlebars.registerPartial('heading',
    /* html */
    `
    {{#each headingData}}
      <h1 class="${css.heading}">
        {{#if isClickable}}
          <a class="${css.heading__text} ${css.heading__text_clickable} newRoute"
            href="{{link}}">
            {{text}}
          </a>
        {{else}}
          <p class="${css.heading__text}
            {{#if isDrama}}
              ${css.heading__text_drama}
            {{/if}}"
          >
            {{text}}
          </p>
        {{/if}}
      </h1>
    {{/each}}
  `);
} 
