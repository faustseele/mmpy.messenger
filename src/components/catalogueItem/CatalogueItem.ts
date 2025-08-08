import { IComponentData } from "../../framework/Component/Component.d";
import Component, { ComponentParams } from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IComponentFactory } from "../../utils/factory/factory.d";
import { CatalogueItemProps } from "./catalogueItem.d";
import css from "./catalogueItem.module.css";

export class CatalogueItem extends Component<CatalogueItemProps> {
  constructor(props: ComponentParams<CatalogueItemProps>) {
    super(props);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <img class="${css.avatar}" alt="User's avatar from catalogue" src="{{avatar}}" />

      <div class="${css.catalogueItem__content}">
        <p class="${css.userName}">{{title}}</p>
        <p class="${css.contentText}">{{contentText}}</p>
      </div>

      <div class="${css.catalogueItem__infoBox}">
        <p class="${css.infoBoxText}">{{date}}</p>
        {{#if unreadCount}}
          <p class="${css.infoBoxText} ${css.infoBoxText_unread}">{{unreadCount}}</p>
        {{/if}}
      </div>
    `;
  }
}

export const createCatalogueItem: IComponentFactory<CatalogueItemProps> = (
  data: IComponentData<CatalogueItemProps>,
): CatalogueItem => {
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new CatalogueItem({ deps, data });
};
