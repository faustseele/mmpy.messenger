import Handlebars from "handlebars";
import css from "./subheading.module.css"

export default function regSubheading() {
  Handlebars.registerPartial('subheading',
    /* html */
    `
    {{#each subheadingData}}
      <h2 class="${css.subheading}
      {{#if isDrama}}
        ${css.subheading_drama}
      {{/if}}"
    >{{text}}</h2>
    {{/each}}
  `);
} 