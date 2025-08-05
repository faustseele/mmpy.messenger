import Component from "../../framework/Component/Component.ts";
import css from "./catalogueItem.module.css";
import avatar from "../../../static/avatar.png";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { ICatalogueItemConfigs } from "./catalogueItem.d";
import { ComponentProps } from "../../framework/Component/Component.d";

export interface CatalogueItemProps extends ComponentProps {
  configs: ICatalogueItemConfigs;
}

export class CatalogueItem extends Component {
  constructor(props: CatalogueItemProps) {
    const domService = new DOMService("article", {
      class: `${css.catalogueItem} ${props.configs.class || ""}`,
    });
    const fragmentService = new FragmentService();

    super(props, {}, domService, fragmentService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
        <img class="${css.avatar}" alt="User's avatar from catalogue" src="${avatar}" />

        <div class="${css.catalogueItem__content}">
          <p class="${css.userName}">{{__title}}</p>
          <p class="${css.contentText}">{{__contentText}}</p>
        </div>

        <div class="${css.catalogueItem__infoBox}">
          <p class="${css.infoBoxText}">{{__date}}</p>
          <p class="${css.infoBoxText} ${css.infoBoxText_unread}">{{__unreadCount}}</p>
        </div>
      `;
  }
}
