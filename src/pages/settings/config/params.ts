/* eslint-disable @typescript-eslint/no-explicit-any */
import { cx } from "@/shared/lib/helpers/formatting/classnames.ts";
import { getButtonNode } from "@/shared/ui/Button/factory.ts";
import { getHeadingNode } from "@/shared/ui/Heading/factory.ts";
import { getSubheadingNode } from "@/shared/ui/Subheading/factory.ts";
import { RouteConfigs } from "@app/providers/router/types.ts";
import { getEditorNode } from "@features/edit-profile/model/factory.ts";
import { PageId } from "@pages/page/config/const.ts";
import cssPage from "@pages/page/ui/page.module.css";
import { ROOT_QUERY } from "@shared/config/dom.ts";
import { ComponentParams } from "@shared/lib/Component/model/types.ts";
import { RouteLink } from "@shared/types/universal.ts";
import profileAvatar from "../../../../static/profile-avatar.png";
import { handleMessengerClick } from "../model/actions.ts";
import { SettingsProps } from "../model/types.ts";
import css from "../ui/settings.module.css";

const editorNodes_info = {
  "editor-email": getEditorNode("editor-email", "email", "Эл. почта"),
  "editor-name": getEditorNode("editor-name", "name", "Имя"),
  "editor-surname": getEditorNode("editor-surname", "surname", "Фамилия"),
  "editor-login": getEditorNode("editor-login", "login", "Логин"),
  "editor-display_name": getEditorNode(
    "editor-display_name",
    "display_name",
    "Имя в чате",
  ),
  "editor-phone": getEditorNode("editor-phone", "phone", "Номер телефона"),
};

const editorNodes_psw = {
  "editor-oldPassword": getEditorNode(
    "editor-oldPassword",
    "oldPassword",
    "Старый пароль",
    { placeholder: "* * * * *" },
  ),
  "editor-newPassword": getEditorNode(
    "editor-newPassword",
    "newPassword",
    "Новый пароль",
    { placeholder: "* * * * *" },
  ),
};

export const settingsPageParams: ComponentParams<SettingsProps> = {
  configs: {
    id: PageId.Settings,
    rootTag: "form",
    classNames: cx(cssPage.moduleWindow, css.moduleWindow_profile),
    type: "change-info",
    profileName: "Loading..",
    profileAvatar,
    user: null,
  },
  children: {
    nodes: {
      ...(editorNodes_info as any),
      ...(editorNodes_psw as any),
      heading_profile: getHeadingNode("heading_profile", "Профиль 👤") as any,
      heading_backToChats: getHeadingNode("heading_backToChats", "⮘ Назад", {
        isClickable: true,
        on: { click: handleMessengerClick },
      }) as any,
      subheading_form: getSubheadingNode(
        "subheading_form",
        "Ваши данные:",
      ) as any,
      buttonEditInfo: getButtonNode("buttonEditInfo", "Изменить данные", {
        type: "submit",
      }) as any,
      buttonEditPassword: getButtonNode(
        "buttonEditPassword",
        "Изменить пароль",
        {
          isSilent: true,
        },
      ) as any,
      buttonLogout: getButtonNode("buttonLogout", "Выйти", {
        isSilent: true,
      }) as any,
    },
    edges: {
      heading_backToChats: "heading_backToChats",
      heading_profile: "heading_profile",
      subheading_form: "subheading_form",
      inputsEditors_info: [
        "editor-email",
        "editor-name",
        "editor-surname",
        "editor-login",
        "editor-display_name",
        "editor-phone",
      ],
      inputsEditors_password: ["editor-oldPassword", "editor-newPassword"],
      buttonEditInfo: "buttonEditInfo",
      buttonEditPassword: "buttonEditPassword",
      buttonLogout: "buttonLogout",
    },
  },
  on: {
    messengerClick: handleMessengerClick,
    submit: () => {},
  },
};

export const settingsPageRouteConfig: RouteConfigs = {
  path: RouteLink.Settings,
  rootQuery: ROOT_QUERY,
  authStatus: "protected",
  params: {},
};
