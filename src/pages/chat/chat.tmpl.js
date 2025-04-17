import Handlebars from "handlebars";
import regInput from "../../components/input/input.tmpl";
import { chatsData } from "./data";
import regCatalogueItem from "../../components/catalogueItem/catalogueItem.tmpl";
import pagesCss from "../pages.module.css"
import css from "./chat.module.css"

export function getChatPage() {

  regCatalogueItem()

  const html =
    /* html */
    `<div class="${pagesCss.moduleWindow} ${css.moduleWindow_chat}">
      <div class="${css.catalogue}">
        <div class="${css.catalogue__head}">
          <div class="${css.catalogue__headings}">
            {{> heading}}
          </div>
          <input class="${css.searchInput}" type="text" placeholder="Поиск" />
        </div>

        <div class="${css.catalogue__items}">
          {{> catalogueItem}}
        </div>
      </div>

      <div class="${css.chat}">
        <p style="font-size: 14px; color: var(--color-content-darkest); opacity: 0.5;">С кем початимся? (Заглушка)</p>
      </div>
    </div>`;

  const compiledTemplate = Handlebars.compile(html);

  return compiledTemplate(chatsData);
}

/* For future markup: */

{/* <div class="${css.chatHeader}">
<div class="${css.chatHeader__profile}">
  <img class="${css.avatar}" alt="User's Avatar" />
  <p class="${css.userName}">Андрей</p> 
</div>

<div class="${css.chatHeader__tools}">
  {{> button}}
  <button class="${css.chatToolsBtn}" />
</div>
</div>

<div class="${css.chatFeed}">
<div class="${css.message}">'afaffa'</div>
<div class="${css.message}">'afaffa'</div>
<div class="${css.message}">'afaffa'</div>  
<div class="${css.message}">'afaffa'</div>
<div>

<div class="${css.chatFooter}">
<button class="${css.mshAttachmentBtn}" />
<input class="${css.msgInput}" type="text" placeholder="{{inputMessageLabel}}" />
<button class="${css.msgSendBtn}" />
</div>
 */}
 