import Handlebars from "handlebars";
import css from "./heading.module.css";

export default function regHeading() {
  Handlebars.registerPartial('heading',
    /* html */
    `
    {{#each headingData}}
      <h1 class="${css.heading}
        {{#if isClickable}}
          ${css.heading_clickable}
        {{/if}}
        {{#if isDrama}}
          ${css.heading_drama}
        {{/if}}"
      >
        {{text}}
      </h1>
    {{/each}}
  `);
} 