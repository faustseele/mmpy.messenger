import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import AuthService from "../../../features/auth/by-credentials/model/AuthService.ts";
import {
  ComponentData,
  ComponentProps,
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { buildChildren } from "../../../shared/lib/helpers/factory/functions.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import { Page } from "../../page/ui/Page.ts";
import { ProfileMap, ProfileProps, ProfileSchema } from "../model/types.ts";
import css from "./profile.module.css";

export class ProfilePage extends Page<ProfileProps, ProfileMap, ProfileSchema> {
  constructor(props: ComponentProps<ProfileProps, ProfileMap, ProfileSchema>) {
    super(props);
    console.log(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!Object.keys(this.childrenInstances?.singles ?? 0).length) {
      console.error(
        "ProfilePage: Children are not defined",
        this.childrenInstances,
      );
      return;
    }

    const inputs = this.childrenInstances!.lists.inputsEditors;
    const {
      heading_backToChats: headingBack,
      buttonEditInfo,
      buttonEditPassword,
      buttonLogout,
    } = this.childrenInstances!.singles;

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

    buttonEditPassword.setProps({
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
    return /*html*/ `
      <header class="${css.profileHeadings}">
      {{{ heading_profile }}}
      {{{ heading_backToChats }}}

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
            {{{ inputsEditors }}}
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

export const createProfilePage: PageFactory<
  ProfileProps,
  ProfilePage,
  ProfileMap,
  ProfileSchema
> = (
  data: ComponentData<ProfileProps, ProfileMap, ProfileSchema>,
): ProfilePage => {
  if (!data.childrenSchema) {
    throw new Error("ProfilePage: ChildrenScheme is not defined");
  }

  const childrenInstances = buildChildren<ProfileMap, ProfileSchema>(
    data.childrenSchema,
  );

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new ProfilePage({
    deps,
    data: { ...data, childrenInstances },
  });
};
