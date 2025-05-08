import Handlebars from "handlebars";
import { chatData } from "./data.ts";
import css from "./chat.module.css";
import pagesCss from "../pages.module.css";
import regCatalogueItem from "../../components/catalogueItem/catalogueItem.tmpl";
import regInputMessage from "../../components/inputMessage/inputMessage.tmpl.ts";

export function getChatPage() {
  regCatalogueItem();
  regInputMessage();

  const html =
    /* html */
    `<div class="${pagesCss.moduleWindow} ${css.moduleWindow_chat}">
      <div class="${css.catalogue}">
        <header class="${css.catalogue__head}">
          <div class="${css.catalogue__headings}">
            {{> heading}}
          </div>
          <input class="${css.searchInput}" type="text" placeholder="Поиск 🔍" />
        </header>

        <div class="${css.catalogue__items}">
          {{> catalogueItem}}
        </div>
      </div>

      <main class="${css.chat}">
        <div class="${css.chat__header}">
          <div class="${css.chatParticipant}">
            <img class="${css.chatParticipant__avatar}" src="${chatData.chatData.particantAvatar}"/>
            <p class="${css.chatParticipant__name}">{{chatData.chatData.participantName}}</p>
          </div>
        </div>

        <div class="${css.chat__feed}">
        
        </div>

        {{> inputMessage}}
      </main>
    </div>`;

  const compiledTemplate = Handlebars.compile(html);

  return compiledTemplate(chatData);
}
