import profileAvatar from "../../../static/profile-avatar.png";
import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import Router from "../../core/Router/Router.ts";
import { Routes } from "../../core/Router/routes.d";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { FormController } from "../auth/FormController.ts";
import pagesCss from "../pages.module.css";
import { IProfilePageData } from "./profile.d";
import css from "./profile.module.css";
import { createChildren } from "./utils.ts";

export interface ProfilePageProps extends ComponentProps {
  configs: IProfilePageData;
}

export class ProfilePage extends Component {
  constructor(props: ProfilePageProps, router: Router) {
    const domService = new DOMService("form", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_profile}`,
    });
    const templateService = new FragmentService();

    const { configs } = props;
    const children = createChildren(configs);

    const {
      heading_backToChats,
      inputs,
      buttonEditInfo,
      buttonEditPassword,
      buttonLogout,
    } = children;

    const formController = new FormController(router, inputs);

    buttonEditInfo.setProps({
      events: {
        click: (e: Event) => formController.onFormSubmit(e, Routes.Chats),
      },
    });
    buttonEditPassword.setProps({
      events: {
        click: (e: Event) => formController.onFormSubmit(e, Routes.Chats),
      },
    });
    buttonLogout.setProps({
      events: {
        click: (e: Event) => router.routeTo(Routes.SignIn, e),
      },
    });
    inputs.forEach((input) => {
      input.setProps({
        events: {
          focusout: () => formController.onInputBlur(input),
        },
      });
    });
    heading_backToChats.setProps({
      events: {
        click: (e: Event) => router.routeTo(Routes.Chats, e),
      },
    });

    super({ configs }, children, domService, templateService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <header class="${css.profileHeadings}">
        {{{ heading_profile }}}
        {{{ heading_backToChats }}}
      </header>
      
      <main class="${css.profileContent}">
        <div class="${css.profileFace}">
          
          <label for="avatar-input" class="${css.avatarContainer}">
            <img alt="User's avatar" src="${profileAvatar}" class="${css.avatarImage}" />
            <div class="${css.avatarOverlay}">
              <span class="${css.overlayText}">change avatar</span>
            </div>
          </label>
          <input id="avatar-input" type="file" name="avatar" class="${css.avatarFileInput}" />

          <h2 class="${css.profileFace__name}">{{ __profileName }}</h2>
        </div>

        <div class="${css.profileInputs}">
          <div class="${css.profileInputs__list}">
            {{{ inputs }}}
          </div>
        </div>
      </main>

      <footer class="${css.profileFooter}">
        {{{ buttonEditInfo }}}
        {{{ buttonEditPassword }}}
        {{{ buttonLogout }}}
      </footer>
    `;
  }
}
