import Handlebars from "handlebars";
import { chatData } from "./data.ts";
import css from "./chat.module.css";
import pagesCss from "../pages.module.css";
import regCatalogueItem from "../../components/catalogueItem/catalogueItem.tmpl";
import regInputMessage from "../../components/inputMessage/inputMessage.tmpl.ts";
import regMessage from "../../components/message/message.tmpl.ts";

export function getChatPage() {
  regCatalogueItem();
  regInputMessage();
  regMessage();

  const optionsStyle = `background-image: url(../../../static/options.svg)`;

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
            <img class="${css.chatParticipant__avatar}" src="${chatData.chatData.participantAvatar}"/>
            <p class="${css.chatParticipant__name}">{{chatData.participantName}}</p>
          </div>

          <div class="${css.chatOptions}">
            {{> button}}
            <button type="button" class="${css.chatOptions__button}"
              style="${optionsStyle}"></button>
          </div>
        </div>

        <div class="${css.chat__feed}">
          {{> message}}
        
        </div>

        {{> inputMessage}}
      </main>
    </div>`;

  const compiledTemplate = Handlebars.compile(html);

  return compiledTemplate(chatData);
}
