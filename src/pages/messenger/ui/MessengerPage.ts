import Router from "../../../app/providers/router/Router.ts";
import css from "./messenger.module.css";
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
import { MessengerMap, MessengerProps, MessengerSchema } from "../model/types.ts";

export class MessengerPage extends Page<MessengerProps, MessengerMap, MessengerSchema> {
  constructor(props: ComponentProps<MessengerProps, MessengerMap, MessengerSchema>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const headingToSettings =
      this.childrenInstances!.singles.heading_goToSettings;
    const deleteButton = this.childrenInstances!.singles.deleteChatButton;

    headingToSettings?.setProps({
      events: {
        click: () => Router.go(RouteLink.Settings),
      },
    });

    deleteButton?.setProps({
      events: {
        click: () => {
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
            {{{ heading_goToSettings }}}
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

export const createMessengerPage: PageFactory<
  MessengerProps,
  MessengerPage,
  MessengerMap,
  MessengerSchema
> = (data: ComponentData<MessengerProps, MessengerMap, MessengerSchema>): MessengerPage => {
  if (!data.childrenSchema) {
    throw new Error("MessengerPage: childrenSchema is not defined");
  }

  const childrenInstances = buildChildren<MessengerMap, MessengerSchema>(
    data.childrenSchema,
  );

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new MessengerPage({
    deps,
    data: {
      ...data,
      childrenInstances,
    },
  });
};
