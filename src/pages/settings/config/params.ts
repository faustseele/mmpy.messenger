/* eslint-disable @typescript-eslint/no-explicit-any */
import profileAvatar from "../../../../static/profile-avatar.png";
import {
  RouteConfigs,
} from "../../../app/providers/router/types.ts";
import {
  getEditorNode
} from "../../../features/edit-profile/model/factory.ts";
import cssPage from "../../../pages/page/ui/page.module.css";
import { ROOT_QUERY } from "../../../shared/config/dom.ts";
import { ComponentParams } from "../../../shared/lib/Component/model/types.ts";
import { RouteLink } from "../../../shared/types/universal.ts";
import {
  getButtonNode
} from "../../../shared/ui/Button/utils.ts";
import {
  getHeadingNode
} from "../../../shared/ui/Heading/utils.ts";
import { PageId } from "../../page/config/const.ts";
import { SettingsProps } from "../model/types.ts";
import cssSettings from "../ui/settings.module.css";

const iptIds = [
  "inputEditor-email",
  "inputEditor-name",
  "inputEditor-surname",
  "inputEditor-login",
  "inputEditor-display_name",
  "inputEditor-phone",
  "inputEditor-oldPassword",
  "inputEditor-newPassword",
];

const inputEditorsNodes = {
  [iptIds[0]]: getEditorNode(
    iptIds[0],
    "email",
    "Эл. почта",
    "pochta@yandex.ru",
    "email",
  ),
  [iptIds[1]]: getEditorNode(
    iptIds[1],
    "name",
    "Имя",
    "Иван",
    "text",
  ),
  [iptIds[2]]: getEditorNode(
    iptIds[2],
    "surname",
    "Фамилия",
    "Иванов",
    "text",
  ),
  [iptIds[3]]: getEditorNode(
    iptIds[3],
    "login",
    "Логин",
    "ivanov",
    "text",
  ),
  [iptIds[4]]: getEditorNode(
    iptIds[4],
    "display_name",
    "Имя в чате",
    "Vanya",
    "text",
  ),
  [iptIds[5]]: getEditorNode(
    iptIds[5],
    "phone",
    "Номер телефона",
    "+7 905 551-23-45",
    "tel",
  ),
  [iptIds[6]]: getEditorNode(
    iptIds[6],
    "oldPassword",
    "Старый пароль",
    "***",
    "password",
  ),
  [iptIds[7]]: getEditorNode(
    iptIds[7],
    "newPassword",
    "Новый пароль",
    "***",
    "password",
  ),
};

export const settingsPageParams: ComponentParams<SettingsProps> = {
  configs: {
    id: PageId.Settings,
    tagName: "div",
    profileName: "Loading..",
    profileAvatar,
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssSettings.moduleWindow_profile}`,
  },
  children: {
    nodes: {
      ...inputEditorsNodes,
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
      buttonEditInfo: getButtonNode({
        id: "buttonEditInfo",
        label: "Изменить данные",
        type: "submit",
      }) as any,
      buttonEditPassword: getButtonNode({
        id: "buttonEditPassword",
        label: "Изменить пароль",
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
      buttonEditInfo: "buttonEditInfo",
      buttonEditPassword: "buttonEditPassword",
      buttonLogout: "buttonLogout",
      inputsEditors: iptIds,
    },
  },
};

export const settingsPageRouteConfig: RouteConfigs = {
  path: RouteLink.Settings,
  rootQuery: ROOT_QUERY,
  authStatus: "protected",
  params: {},
};
