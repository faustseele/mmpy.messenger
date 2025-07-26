import profileAvatar from "../../../static/profile-avatar.png";
import { RouteLink } from "../../core/Router/router.d";
import Router from "../../core/Router/Router.ts";
import { ComponentProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { FormController } from "../auth/FormController.ts";
import pagesCss from "../pages.module.css";
import { IProfilePageConfigs } from "./profile.d";
import css from "./profile.module.css";
import { createChildren } from "./utils.ts";

export interface ProfilePageProps extends ComponentProps {
  configs: IProfilePageConfigs;
}

export class ProfilePage extends Component {
  constructor(props: ProfilePageProps) {
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

    const formController = new FormController(inputs);

    buttonEditInfo.setProps({
      events: {
        click: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
      },
    });
    buttonEditPassword.setProps({
      events: {
        click: (e: Event) => formController.onFormSubmit(e, RouteLink.Chats),
      },
    });
    buttonLogout.setProps({
      events: {
        click: () => Router.go(RouteLink.SignIn),
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
        click: () => Router.go(RouteLink.Chats),
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
