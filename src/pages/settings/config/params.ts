/* eslint-disable @typescript-eslint/no-explicit-any */
import profileAvatar from "../../../../static/profile-avatar.png";
import {
  RouteConfigs,
  RouteLink,
} from "../../../app/providers/router/types.ts";
import { connect } from "../../../app/providers/store/connect.ts";
import {
  buildInputEditor,
  getEditorProps as getEdProps,
} from "../../../features/edit-profile/model/utils.ts";
import cssPage from "../../../pages/page/ui/page.module.css";
import { ComponentParams } from "../../../shared/lib/Component/model/types.ts";
import {
  buildButton,
  getButtonProps,
} from "../../../shared/ui/Button/utils.ts";
import {
  buildHeading,
  getHeadingProps,
} from "../../../shared/ui/Heading/utils.ts";
import { PageId } from "../../page/config/const.ts";
import { PageNode } from "../../page/model/types.ts";
import { SettingsProps } from "../model/types.ts";
import { buildSettingsPage, mapSettingsState } from "../model/utils.ts";
import cssSettings from "../ui/settings.module.css";
import type { SettingsPage } from "../ui/SettingsPage.ts";

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
  [iptIds[0]]: {
    params: getEdProps(
      iptIds[0],
      "email",
      "Эл. почта",
      "pochta@yandex.ru",
      "email",
    ),
    factory: buildInputEditor as any,
  },
  [iptIds[1]]: {
    params: getEdProps(iptIds[1], "name", "Имя", "Иван", "text"),
    factory: buildInputEditor as any,
  },
  [iptIds[2]]: {
    params: getEdProps(iptIds[2], "surname", "Фамилия", "Иванов", "text"),
    factory: buildInputEditor as any,
  },
  [iptIds[3]]: {
    params: getEdProps(iptIds[3], "login", "Логин", "ivanov", "text"),
    factory: buildInputEditor as any,
  },
  [iptIds[4]]: {
    params: getEdProps(
      iptIds[4],
      "display_name",
      "Имя в чате",
      "Vanya",
      "text",
    ),
    factory: buildInputEditor as any,
  },
  [iptIds[5]]: {
    params: getEdProps(
      iptIds[5],
      "phone",
      "Номер телефона",
      "+7 905 551-23-45",
      "tel",
    ),
    factory: buildInputEditor as any,
  },
  [iptIds[6]]: {
    params: getEdProps(
      iptIds[6],
      "oldPassword",
      "Старый пароль",
      "***",
      "password",
    ),
    factory: buildInputEditor as any,
  },
  [iptIds[7]]: {
    params: getEdProps(
      iptIds[7],
      "newPassword",
      "Новый пароль",
      "***",
      "password",
    ),
    factory: buildInputEditor as any,
  },
};

const settingsPageParams: ComponentParams<SettingsProps> = {
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
      heading_profile: {
        params: getHeadingProps({
          id: "heading_profile",
          type: "profile-title",
          text: "Профиль 👤",
        }),
        factory: buildHeading as any,
      },
      heading_backToChats: {
        params: getHeadingProps({
          id: "heading_backToChats",
          type: "profile-back",
          text: "⮘ Назад",
          isClickable: true,
          link: RouteLink.Messenger,
        }),
        factory: buildHeading as any,
      },
      buttonEditInfo: {
        params: getButtonProps({
          id: "buttonEditInfo",
          label: "Изменить данные",
          type: "submit",
        }),
        factory: buildButton as any,
      },
      buttonEditPassword: {
        params: getButtonProps({
          id: "buttonEditPassword",
          label: "Изменить пароль",
        }),
        factory: buildButton as any,
      },
      buttonLogout: {
        params: getButtonProps({
          id: "buttonLogout",
          label: "Выйти",
          isSilent: true,
        }),
        factory: buildButton as any,
      },
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

export const settingsPageNode: PageNode<SettingsProps, SettingsPage> = {
  params: settingsPageParams,
  factory: buildSettingsPage as any,
};

export const settingsPageRouteConfig: RouteConfigs = {
  path: RouteLink.Settings,
  rootQuery: "#app",
  authStatus: "protected",
  params: {},
};

export const createSettingsPage = connect(settingsPageNode, mapSettingsState);
