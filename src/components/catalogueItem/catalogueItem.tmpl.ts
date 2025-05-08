import Handlebars from 'handlebars'
import css from './catalogueItem.module.css'
import avatar from '../../../static/avatar.png'

export default function regCatalogueItem () {
  Handlebars.registerPartial(
    'catalogueItem',
    /* html */
    `
    {{#each catalogueItemData}}
    <article class="${css.catalogueItem}">
      <img class="${css.avatar}" alt="User's avatar from catalogue" src="${avatar}" />

      <div class="${css.catalogueItem__content}">
        <p class="${css.userName}">{{title}}</p>
        <p class="${css.contentText}">{{contentText}}</p>
      </div>

      <div class="${css.catalogueItem__infoBox}">
        <p class="${css.infoBoxText}">{{date}}</p>
        <p class="${css.infoBoxText} ${css.infoBoxText_unread}">{{unreadCount}}</p>
      </div>
    </article>
    {{/each}}
  `
  )
}
