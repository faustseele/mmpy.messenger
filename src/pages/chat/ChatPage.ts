import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { ComponentProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import pagesCss from "../pages.module.css";
import { IChatPageConfigs } from "./chat.d";
import css from "./chat.module.css";
import { createChildren } from "./utils.ts";

export interface ChatPageProps extends ComponentProps {
  configs: IChatPageConfigs;
}

export class ChatPage extends Component {
  constructor(props: ChatPageProps) {
    const domService = new DOMService("div", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_chat}`,
    });
    const fragmentService = new FragmentService();

    const { configs } = props;
    const children = createChildren(configs);

    super({ configs }, children, domService, fragmentService);

    children.deleteChatButton.setProps({
      events: {
        click: () => Router.go(RouteLink.Chats),
      },
    });

    children.heading_goToProfile.setProps({
      events: {
        click: () => Router.go(RouteLink.Profile),
      },
    });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <div class="${css.catalogue}">
          <header class="${css.catalogue__head}">

            <div class="${css.catalogue__headings}">
              {{{ heading_chats }}}
              {{{ heading_goToProfile }}}
            </div>

            {{{ searchInput }}}
            
          </header>

          <div class="${css.catalogue__items}">
            {{{ catalogueItems }}}
          </div>
        </div>

        <main class="${css.chat}">

          <header class="${css.chat__header}">
            <div class="${css.chatParticipant}">
                <img class="${css.chatParticipant__avatar}" src="{{ chatData.participantAvatar }}"/>
              <p class="${css.chatParticipant__name}">{{ chatData.__participantName }}</p>
            </div>

            <div class="${css.chatOptions}">

              {{{ deleteChatButton }}}

              <button type="button" class="${css.chatOptions__button}"></button>
            </div>
          </header>

          <div class="${css.chat__feed}">
            {{{ messages }}}
          </div>

          {{{ messageFieldConfigs }}}
        </main>
      `;
  }
}
