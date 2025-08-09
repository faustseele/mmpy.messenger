import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import {
  BaseProps,
  IComponentData,
} from "../../framework/Component/Component.d";
import Component, {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { ChatChildrenDataPropsMap, IChatPageConfigs } from "./chat.d";
import css from "./chat.module.css";
import { IChildrenData } from "../../framework/Component/Children.d";

interface ChatPageProps extends BaseProps {
  configs: IChatPageConfigs;
  childrenData?: IChildrenData<ChatChildrenDataPropsMap>;
}

export class ChatPage extends Component<ChatPageProps> {
  constructor(props: ComponentParams<ChatPageProps>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const profileLink = getChildFromMap(this.children!, "heading_goToProfile");
    const deleteButton = getChildFromMap(this.children!, "deleteChatButton");

    profileLink.setProps({
      events: {
        click: () => Router.go(RouteLink.Settings),
      },
    });

    deleteButton.setProps({
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
    const cd = this.childrenData!;
    const headingChatsSlotKey = getChildSlotKey(cd, "heading_chats");
    const headingProfileSlotKey = getChildSlotKey(cd, "heading_goToProfile");
    const searchInputSlotKey = getChildSlotKey(cd, "searchInput");
    const catalogueItemsSlotKey = getChildSlotKey(cd, "catalogueItems");
    const deleteButtonSlotKey = getChildSlotKey(cd, "deleteChatButton");
    const messagesSlotKey = getChildSlotKey(cd, "messages");
    const messageFieldSlotKey = getChildSlotKey(cd, "messageField");

    return /*html*/ `
      <aside class="${css.catalogue}">
        <header class="${css.catalogue__head}">
          <div class="${css.catalogue__headings}">
            {{{ ${headingChatsSlotKey} }}}
            {{{ ${headingProfileSlotKey} }}}
          </div>
          {{{ ${searchInputSlotKey} }}}
        </header>
        <ul class="${css.catalogue__items}">
          {{{ ${catalogueItemsSlotKey} }}}
        </ul>
      </aside>

      <main class="${css.chat}">
        <header class="${css.chat__header}">
          <div class="${css.chatParticipant}">
            <img class="${css.chatParticipant__avatar}" src="{{ participantAvatar }}" alt="Participant avatar"/>
            <p class="${css.chatParticipant__name}">{{ participantName }}</p>
          </div>
          <div class="${css.chatOptions}">
            {{{ ${deleteButtonSlotKey} }}}
            <button type="button" class="${css.chatOptions__button}"></button>
          </div>
        </header>
        <div class="${css.chat__feed}">
          {{{ ${messagesSlotKey} }}}
        </div>
        {{{ ${messageFieldSlotKey} }}}
      </main>
    `;
  }
}

export const createChatPage: IComponentFactory<ChatPageProps> = (
  data: IComponentData<ChatPageProps>,
): ChatPage => {
  if (!data.childrenData) {
    throw new Error("ChatPage: ChildrenData are not defined");
  }

  const children = createChildren(data.childrenData);

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  const preparedData = {
    ...data,
    children,
  };

  return new ChatPage({ deps, data: preparedData });
};
