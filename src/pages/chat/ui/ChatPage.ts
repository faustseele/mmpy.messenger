import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { Page } from "../../page/ui/Page.ts";
import { ChatMap, ChatProps, ChatSchema } from "../model/types.ts";
import css from "./chat.module.css";

export class ChatPage extends Page<ChatProps, ChatMap, ChatSchema> {
  constructor(props: ComponentProps<ChatProps, ChatMap, ChatSchema>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const headingToProfile =
      this.childrenInstances!.singles.heading_goToProfile;
    const deleteButton = this.childrenInstances!.singles.deleteChatButton;

    headingToProfile?.setProps({
      events: {
        click: () => Router.go(RouteLink.Settings),
      },
    });

    deleteButton?.setProps({
      events: {
        click: () => {
          console.log("Chat deletion initiated.");
          /* Reroute of deletion */
          Router.go(RouteLink.NotFound);
        },
      },
    });
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <aside class="${css.catalogue}">
        <header class="${css.catalogue__head}">
          <div class="${css.catalogue__headings}">
            {{{ heading_chats }}}
            {{{ heading_goToProfile }}}
          </div>
          {{{ searchInput }}}
        </header>
        <ul class="${css.catalogue__items}">
          {{{ catalogueItems }}}
        </ul>
      </aside>

      <main class="${css.chat}">
        <header class="${css.chat__header}">
          <div class="${css.chatParticipant}">
            <img class="${css.chatParticipant__avatar}" src="{{ participantAvatar }}" alt="Participant avatar"/>
            <p class="${css.chatParticipant__name}">{{ participantName }}</p>
          </div>
          <div class="${css.chatOptions}">
            {{{ deleteChatButton }}}
            <button type="button" class="${css.chatOptions__button}"></button>
          </div>
        </header>
        <div class="${css.chat__feed}">
          {{{ messages }}}
        </div>
        {{{ messageField }}}
      </main>
    `;
  }
}

export const createChatPage: PageFactory<
  ChatProps,
  ChatPage,
  ChatMap,
  ChatSchema
> = (data: ComponentData<ChatProps, ChatMap, ChatSchema>): ChatPage => {
  if (!data.childrenSchema) {
    throw new Error("ChatPage: childrenSchema is not defined");
  }

  const childrenInstances = buildChildren<ChatMap, ChatSchema>(
    data.childrenSchema,
  );

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new ChatPage({
    deps,
    data: {
      ...data,
      childrenInstances,
    },
  });
};
