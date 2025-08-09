import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { IComponentData } from "../../framework/Component/Component.d";
import {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildrenFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import { FormController } from "../../services/forms/FormController.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { IPageFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import { Page } from "../Page.ts";

import { ProfilePageProps } from "./profile.d";
import css from "./profile.module.css";

export class ProfilePage extends Page<ProfilePageProps> {
  constructor(props: ComponentParams<ProfilePageProps>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const inputs = getChildrenFromMap(this.children!, "inputEditors");
    const headingBack = getChildFromMap(this.children!, "heading_backToChats");
    const buttonEditInfo = getChildFromMap(this.children!, "buttonEditInfo");
    const buttonEditPass = getChildFromMap(
      this.children!,
      "buttonEditPassword",
    );
    const buttonLogout = getChildFromMap(this.children!, "buttonLogout");

    const formController = new FormController(inputs);

    headingBack.setProps({
      events: { click: () => Router.go(RouteLink.Chats) },
    });

    buttonEditInfo.setProps({
      events: {
        click: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
      },
    });

    buttonEditPass.setProps({
      events: {
        click: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
      },
    });

    buttonLogout.setProps({
      events: { click: () => Router.go(RouteLink.SignIn) },
    });

    inputs.forEach((input) => {
      input.setProps({
        events: { focusout: () => formController.onInputBlur(input) },
      });
    });
  }

  public getSourceMarkup(): string {
    const cd = this.childrenData!;
    const headingProfileKey = getChildSlotKey(cd, "heading_profile");
    const headingBackKey = getChildSlotKey(cd, "heading_backToChats");
    const inputsEditorsKey = getChildSlotKey(cd, "inputEditors");
    const buttonEditInfoKey = getChildSlotKey(cd, "buttonEditInfo");
    const buttonEditPassKey = getChildSlotKey(cd, "buttonEditPassword");    
    const buttonLogoutKey = getChildSlotKey(cd, "buttonLogout");

    return /*html*/ `
      <header class="${css.profileHeadings}">
        {{{ ${headingProfileKey} }}}
        {{{ ${headingBackKey} }}}
      </header>
      
      <main class="${css.profileContent}">
        <div class="${css.profileFace}">
          <label for="avatar-input" class="${css.avatarContainer}">
            <img alt="User's avatar" src="{{ profileAvatar }}" class="${css.avatarImage}" />
            <div class="${css.avatarOverlay}">
              <span class="${css.overlayText}">change avatar</span>
            </div>
          </label>
          <input id="avatar-input" type="file" name="avatar" class="${css.avatarFileInput}" />
          <h2 class="${css.profileFace__name}">{{ profileName }}</h2>
        </div>

        <div class="${css.profileInputs}">
          <div class="${css.profileInputs__list}">
            {{{ ${inputsEditorsKey} }}}
          </div>
        </div>
      </main>

      <footer class="${css.profileFooter}">
        {{{ ${buttonEditInfoKey} }}}
        {{{ ${buttonEditPassKey} }}}
        {{{ ${buttonLogoutKey} }}}
      </footer>
    `;
  }
}

// The factory function, which follows the established pattern
export const createProfilePage: IPageFactory<ProfilePageProps> = (
  data: IComponentData<ProfilePageProps>,
): ProfilePage => {
  if (!data.childrenData) {
    throw new Error("ProfilePage: ChildrenData are not defined");
  }

  const children = createChildren(data.childrenData);
  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  const preparedData = { ...data, children };
  return new ProfilePage({ deps, data: preparedData });
};
