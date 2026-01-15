/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { cx } from "@/shared/lib/helpers/formatting/classnames.ts";

const inputsEditors_profile = [
  "inputEditor-email",
  "inputEditor-name",
  "inputEditor-surname",
  "inputEditor-login",
  "inputEditor-display_name",
  "inputEditor-phone",
];
const iptProf = inputsEditors_profile;

const inputsEditors_password = [
  "inputEditor-oldPassword",
  "inputEditor-newPassword",
];
const iptPsw = inputsEditors_password;

const inputsEditorsNodes_profile = {
  [iptProf[0]]: getEditorNode(
    iptProf[0],
    "email",
    "Эл. почта",
    "pochta@yandex.ru",
    "email",
  ),
  [iptProf[1]]: getEditorNode(iptProf[1], "name", "Имя", "Иван", "text"),
  [iptProf[2]]: getEditorNode(
    iptProf[2],
    "surname",
    "Фамилия",
    "Иванов",
    "text",
  ),
  [iptProf[3]]: getEditorNode(iptProf[3], "login", "Логин", "ivanov", "text"),
  [iptProf[4]]: getEditorNode(
    iptProf[4],
    "display_name",
    "Имя в чате",
    "Vanya",
    "text",
  ),
  [iptProf[5]]: getEditorNode(
    iptProf[5],
    "phone",
    "Номер телефона",
    "+7 905 551-23-45",
    "tel",
  ),
};

const inputsEditorsNodes_password = {
  [iptPsw[0]]: getEditorNode(
    iptPsw[0],
    "oldPassword",
    "Старый пароль",
    "***",
    "password",
  ),
  [iptPsw[1]]: getEditorNode(
    iptPsw[1],
    "newPassword",
    "Новый пароль",
    "***",
    "password",
  ),
};

export const settingsPageParams: ComponentParams<SettingsProps> = {
  configs: {
    id: PageId.Settings,
    rootTag: "div",
    classNames: cx(cssPage.moduleWindow, css.moduleWindow_profile),
    profileName: "Loading..",
    profileAvatar,
    user: null,
  },
  children: {
    nodes: {
      ...inputsEditorsNodes_profile,
      ...inputsEditorsNodes_password,
      heading_profile: getHeadingNode({
        id: "heading_profile",
        type: "profile-title",
        text: "Профиль 👤",
      }) as any,
      heading_backToChats: getHeadingNode({
        id: "heading_backToChats",
        type: "profile-back",
        text: "⮘ Назад",
        isClickable: true,
        link: RouteLink.Messenger,
      }) as any,
      subheading_form: getSubheadingNode({
        id: "subheading_form",
        text: "Ваши данные:",
      }) as any,
      buttonEditInfo: getButtonNode({
        id: "buttonEditInfo",
        label: "Изменить данные",
        type: "submit",
      }) as any,
      buttonEditPassword: getButtonNode({
        id: "buttonEditPassword",
        label: "Изменить пароль",
        isSilent: true,
      }) as any,
      buttonLogout: getButtonNode({
        id: "buttonLogout",
        label: "Выйти",
        isSilent: true,
      }) as any,
    },
    edges: {
      heading_backToChats: "heading_backToChats",
      heading_profile: "heading_profile",
      subheading_form: "subheading_form",
      inputsEditors_profile,
      inputsEditors_password,
      buttonEditInfo: "buttonEditInfo",
      buttonEditPassword: "buttonEditPassword",
      buttonLogout: "buttonLogout",
    },
  },
  on: {
    messengerClick: handleMessengerClick,
  },
};

export const settingsPageRouteConfig: RouteConfigs = {
  path: RouteLink.Settings,
  rootQuery: ROOT_QUERY,
  authStatus: "protected",
  params: {},
};
