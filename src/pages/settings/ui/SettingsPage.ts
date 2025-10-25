import Router from "../../../app/providers/router/Router.ts";
import { RouteLink } from "../../../app/providers/router/types.ts";
import AuthService from "../../../features/authenticate/model/AuthService.ts";
import UserService from "../../../features/edit-profile/model/UserService.ts";
import { InputEditor } from "../../../features/edit-profile/ui/InputEditor.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { getInstances } from "../../../shared/lib/helpers/factory/functions.ts";
import FormValidator from "../../../shared/lib/validation/FormValidator.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { InputProps } from "../../../shared/ui/Input/types.ts";
import { Page } from "../../page/ui/Page.ts";
import { SettingsNodes, SettingsProps } from "../model/types.ts";
import css from "./settings.module.css";

export class SettingsPage extends Page<SettingsProps> {
  constructor(props: ComponentProps<SettingsProps, SettingsPage>) {
    super(props);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (!this.children || !this.children.nodes) {
      console.error("SettingsPage: Children are not defined", this);
      return;
    }

    /* --- getting instances --- */
    const {
      heading_backToChats,
      buttonEditInfo,
      buttonEditPassword,
      buttonLogout,
    } = this.children.nodes as SettingsNodes;
    const heading = heading_backToChats.runtime?.instance as Heading;
    const editInfo = buttonEditInfo.runtime?.instance as Button;
    const editPassword = buttonEditPassword.runtime?.instance as Button;
    const logout = buttonLogout.runtime?.instance as Button;

    /* --- avatar --- */
    this._wireAvatar();

    /* --- vivifying inputs --- */
    const validator = this._vivifyInputs();

    /* --- setting events --- */
    heading.setProps({
      on: { click: () => Router.go(RouteLink.Messenger) },
    });
    this._wireButtonEvents(editInfo, editPassword, logout, validator);
  }

  public componentDidRender(): void {
    /* re-binding avatar change event */
    this._wireAvatar();
  }

  private _wireButtonEvents(
    editInfo: Button,
    editPassword: Button,
    logout: Button,
    validator: FormValidator,
  ) {
    editInfo.setProps({
      on: {
        click: (e: Event) => validator.onFormSubmit(e, "change-info"),
      },
    });
    editPassword.setProps({
      on: {
        click: (e: Event) => validator.onFormSubmit(e, "change-password"),
      },
    });
    logout.setProps({
      on: {
        click: async (event: Event) => {
          event.preventDefault();
          await AuthService.logout();
        },
      },
    });
  }

  private _wireAvatar(): void {
    const input =
      this.element?.querySelector<HTMLInputElement>("#avatar-input");
    if (!input || input.dataset.bound) return;
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      await UserService.updateAvatar(file);
      input.value = "";
    });
    input.dataset.bound = "true";
  }

  private _vivifyInputs(): FormValidator {
    const inputs = getInstances<InputProps, InputEditor>(
      this.children!,
      "inputsEditors",
    );
    const validator = new FormValidator(inputs);
    inputs.forEach((input) => {
      input!.setProps({
        on: { focusout: () => validator.onInputBlur(input) },
      });
    });
    return validator;
  }

  public getSourceMarkup(): string {
    if (!this.children?.nodes)
      return /*html*/ `<span>ERROR: SettingsPage: Children are not defined</span>`;

    const nodes = this.children.nodes as SettingsNodes;

    return /*html*/ `
      <header class="${css.profileHeadings}">
        {{{ ${nodes["heading_profile"].params.configs.id} }}}
        {{{ ${nodes["heading_backToChats"].params.configs.id} }}}
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
        {{{ ${nodes["buttonEditInfo"].params.configs.id} }}}
        {{{ ${nodes["buttonEditPassword"].params.configs.id} }}}
        {{{ ${nodes["buttonLogout"].params.configs.id} }}}
      </footer>
    `;
  }
}
