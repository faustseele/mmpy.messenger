import AuthService from "../../../controllers/AuthService.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import Router from "../../../app/providers/router/Router.ts";
import { connect } from "../../core/Store/connect.ts";
import { AppState } from "../../core/Store/Store.ts";
import { ComponentData } from "../../framework/Component/component.d";
import { ComponentParams } from "../../framework/Component/Component.ts";
import {
  getChildFromMap,
  getChildrenFromMap,
  getChildSlotKey,
} from "../../framework/Component/utils.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import { PageFactory } from "../../utils/factory/factory.d";
import { createChildren } from "../../utils/factory/factory.ts";
import { Page } from "../../page/ui/Page.ts";

import { ProfilePageProps } from "../model/types.ts";
import css from "./profile.module.css";

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export class ProfilePage extends Page<ProfilePageProps> {
  constructor(props: ComponentParams<ProfilePageProps>) {
    super(props);
    console.log(props);
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

    const formValidator = new FormValidator(inputs);

    headingBack.setProps({
      events: { click: () => Router.go(RouteLink.Chats) },
    });

    buttonEditInfo.setProps({
      events: {
        click: (e: Event) =>
          formValidator.onFormSubmit(e, RouteLink.Settings, "change-info"),
      },
    });

    buttonEditPass.setProps({
      events: {
        click: (e: Event) =>
          formValidator.onFormSubmit(e, RouteLink.Settings, "change-password"),
      },
    });

    buttonLogout.setProps({
      events: {
        click: async (event: Event) => {
          event.preventDefault();
          await AuthService.logout();
        },
      },
    });

    inputs.forEach((input) => {
      input.setProps({
        events: { focusout: () => formValidator.onInputBlur(input) },
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

export const createProfilePage: PageFactory<ProfilePageProps> = (
  data: ComponentData<ProfilePageProps>,
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

  const ConnectedProfilePage = connect(mapStateToProps)(ProfilePage);

  return new ConnectedProfilePage({
    deps,
    data: preparedData,
  }) as ProfilePage;
};
