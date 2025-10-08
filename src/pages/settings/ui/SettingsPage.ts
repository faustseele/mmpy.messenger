import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import AuthService from "../../../features/authenticate/model/AuthService.ts";
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
import { SettingsMap, SettingsProps, SettingsSchema } from "../model/types.ts";
import css from "./settings.module.css";

export class SettingsPage extends Page<
  SettingsProps,
  SettingsMap,
  SettingsSchema
> {
  constructor(
    props: ComponentProps<SettingsProps, SettingsMap, SettingsSchema>,
  ) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!Object.keys(this.childrenInstances?.singles ?? 0).length) {
      console.error(
        "SettingsPage: Children are not defined",
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
      data: {
        events: { click: () => Router.go(RouteLink.Messenger) },
      },
    });

    buttonEditInfo.setProps({
      data: {
        events: {
          click: (e: Event) => formValidator.onFormSubmit(e, "change-info"),
        },
      },
    });

    buttonEditPassword.setProps({
      data: {
        events: {
          click: (e: Event) => formValidator.onFormSubmit(e, "change-password"),
        },
      },
    });

    buttonLogout.setProps({
      data: {
        events: {
          click: async (event: Event) => {
            event.preventDefault();
            await AuthService.logout();
          },
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
      
      <main class="${css.settingsContent}">
        <div class="${css.settingsFace}">
          <label for="avatar-input" class="${css.avatarContainer}">
            <img alt="User's avatar" src="{{ profileAvatar }}" class="${css.avatarImage}" />
            <div class="${css.avatarOverlay}">
              <span class="${css.overlayText}">change avatar</span>
            </div>
          </label>
          <input id="avatar-input" type="file" name="avatar" class="${css.avatarFileInput}" />
          <h2 class="${css.settingsFace__name}">{{ profileName }}</h2>
        </div>

        <div class="${css.settingsInputs}">
          <div class="${css.settingsInputs__list}">
            {{{ inputsEditors }}}
          </div>
        </div>
      </main>

      <footer class="${css.settingsFooter}">
        {{{ buttonEditInfo }}}
        {{{ buttonEditPassword }}}
        {{{ buttonLogout }}}
      </footer>
    `;
  }
}

export const createSettingsPage: PageFactory<
  SettingsProps,
  SettingsPage,
  SettingsMap,
  SettingsSchema
> = (
  data: ComponentData<SettingsProps, SettingsMap, SettingsSchema>,
): SettingsPage => {
  if (!data.childrenSchema) {
    throw new Error("SettingsPage: ChildrenScheme is not defined");
  }

  const childrenInstances = buildChildren<SettingsMap, SettingsSchema>(
    data.childrenSchema,
  );

  const deps = {
    domService: new DOMService(data.configs.tagName, data.attributes),
    fragmentService: new FragmentService(),
  };

  return new SettingsPage({
    deps,
    data: { ...data, childrenInstances },
  });
};
