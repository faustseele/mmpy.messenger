import { Subheading } from "@/shared/ui/Subheading/Subheading.ts";
import { handleUpdateAvatar } from "@entities/user/model/actions.ts";
import { handleLogout } from "@features/authenticate/model/actions.ts";
import { InputEditor } from "@features/edit-profile/ui/InputEditor.ts";
import { Page } from "@pages/page/ui/Page.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import { getInstances } from "@shared/lib/helpers/factory/functions.ts";
import FormValidator from "@shared/lib/validation/FormValidator.ts";
import { Button } from "@shared/ui/Button/Button.ts";
import { Heading } from "@shared/ui/Heading/Heading.ts";
import { InputProps } from "@shared/ui/Input/types.ts";
import { SettingsNodes, SettingsProps, SettingsType } from "../model/types.ts";
import { onBadForm, onGoodForm } from "../model/utils.ts";
import css from "./settings.module.css";

export class SettingsPage extends Page<SettingsProps> {
  protected get isInfo(): boolean {
    return this.configs.type === "change-info";
  }

  constructor(props: ComponentProps<SettingsProps, SettingsPage>) {
    super(props);
  }

  public componentDidMount(): void {
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
    const logoutBtn = buttonLogout.runtime?.instance as Button;
    const inputs = getInstances<InputProps, InputEditor>(
      this.children!,
      "inputsEditors_profile",
    );

    /* --- vivifying inputs --- */
    const validator = new FormValidator(inputs);
    this._vivifyInputs(inputs, validator);

    /* sets placeholders for inputs from user-res */
    this._hydrateInputPlaceholders();

    /* --- setting events --- */
    heading.setProps({
      on: { click: this.on?.messengerClick },
    });
    this._wireButtonEvents(editInfo, editPassword, logoutBtn, validator);
  }

  public componentDidRender(): void {
    /* re-binding avatar change event */
    this._wireAvatar();
    /* sets placeholders for inputs from user-res */
    this._hydrateInputPlaceholders();
  }

  private _hydrateInputPlaceholders(): void {
    if (!this.configs.user || !this.children) return;

    const user = this.configs.user;

    const inputs = getInstances<InputProps, InputEditor>(
      this.children,
      "inputsEditors_profile",
    );

    inputs.forEach((input) => {
      const field = input.configs.fieldId;

      let placeholder: string | null = null;
      switch (field) {
        case "email":
          placeholder = user.email;
          break;
        case "name":
          placeholder = user.first_name;
          break;
        case "surname":
          placeholder = user.second_name;
          break;
        case "login":
          placeholder = user.login;
          break;
        case "display_name":
          placeholder = user.display_name ?? user.login;
          break;
        case "phone":
          placeholder = user.phone;
          break;
        default:
          placeholder = null;
      }

      if (placeholder !== null) {
        input.setProps({ configs: { placeholder } });
      }
    });
  }

  private _wireButtonEvents(
    editInfo: Button,
    editPassword: Button,
    logoutBtn: Button,
    validator: FormValidator,
  ) {
    editInfo.setProps({
      on: {
        click: async (event: Event) => {
          event.preventDefault();

          /* guard-clauses */
          const notInfo = this.configs.type !== "change-info";
          if (notInfo) {
            this._switchType("change-info");
            return;
          }
          const formValid = validator.onFormCheck("change-info", () =>
            onBadForm("change-info"),
          );
          if (!formValid) return;

          editInfo.setProps({
            configs: {
              showSpinner: true,
            },
          });

          await validator.onFormSubmit(
            "change-info",
            onGoodForm("change-info"),
          );

          editInfo.setProps({
            configs: {
              showSpinner: false,
            },
          });
        },
      },
    });
    editPassword.setProps({
      on: {
        click: (event: Event) => {
          event.preventDefault();

          const notPsw = this.configs.type !== "change-password";
          if (notPsw) {
            this._switchType("change-password");
            return;
          }
          const formValid = validator.onFormCheck(
            "change-password",
            onBadForm("change-password"),
          );
          if (!formValid) return;

          validator.onFormSubmit(
            "change-password",
            onGoodForm("change-password"),
          );
        },
      },
    });
    logoutBtn.setProps({
      on: {
        click: async (event: Event) => {
          event.preventDefault();

          handleLogout();
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

      await handleUpdateAvatar(file);
      input.value = "";
    });
    input.dataset.bound = "true";
  }

  private _vivifyInputs(inputs: InputEditor[], validator: FormValidator) {
    inputs.forEach((input) => {
      input!.setProps({
        on: { focusout: () => validator.onInputBlur(input) },
      });
    });
  }

  private _switchType(type: SettingsType) {
    if (!this.children) {
      console.error("SettingsPage: Children are not defined", this);
      return;
    }

    this.configs.type = type;

    const { subheading_form, buttonEditInfo, buttonEditPassword } = this
      .children.nodes as SettingsNodes;

    const subheading = subheading_form.runtime?.instance as Subheading;
    const editInfo = buttonEditInfo.runtime?.instance as Button;
    const editPassword = buttonEditPassword.runtime?.instance as Button;

    const isInfo = type === "change-info";
    subheading.setProps({
      configs: {
        text: isInfo ? "Ваши данные:" : "Ваш пароль:",
      },
    });
    editInfo.setProps({
      configs: {
        isSilent: !isInfo,
        showSpinner: false,
      },
    });
    editPassword.setProps({
      configs: {
        isSilent: isInfo,
        showSpinner: false,
      },
    });
  }

  public getInnerMarkup(): string {
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
          {{{ ${nodes["subheading_form"].params.configs.id} }}}

          <div class="${css.settingsInputs__list}">
            {{#if ${this.isInfo}}}
              {{{ inputsEditors_profile }}}
            {{else}}
              {{{ inputsEditors_password }}}  
            {{/if}}
          </div>
        </div>
      </main>

      <footer class="${css.footer}">
        <div class="${css.footer__horBtns}">
          {{{ ${nodes["buttonEditInfo"].params.configs.id} }}}
          {{{ ${nodes["buttonEditPassword"].params.configs.id} }}}
        </div>
        {{{ ${nodes["buttonLogout"].params.configs.id} }}}
      </footer>
    `;
  }
}
