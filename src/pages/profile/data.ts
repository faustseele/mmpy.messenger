import profileAvatar from "../../../static/profile-avatar.png";
import cssBtn from "../../components/button/button.module.css";
import { createButton } from "../../components/button/Button.ts";
import { createHeading } from "../../components/heading/Heading.ts";
import { createInput } from "../../components/input/Input.ts";
import { createInputEditor } from "../../components/input/InputEditor.ts";
import { RouteLink } from "../../core/Router/router.d";
import { IChildrenData } from "../../framework/Component/Children.d";
import { BaseProps } from "../../framework/Component/Component.d";
import cssPages from "../pages.module.css";
import { IProfilePageConfigs, ProfileChildrenDataPropsMap } from "./profile.d";
import cssProfile from "./profile.module.css";
import cssInput from "../../components/input/input.module.css";
import cssHeading from "../../components/heading/heading.module.css";

interface ProfilePageProps extends BaseProps {
  configs: IProfilePageConfigs;
  childrenData?: IChildrenData<ProfileChildrenDataPropsMap>;
}

const profileChildrenData: IChildrenData<ProfileChildrenDataPropsMap> = {
  heading_profile: {
    type: "single",
    data: {
      configs: {
        slotKey: "heading_profile",
        tagName: "h1",
        text: "Профиль 👤",
      },
      attributes: { className: cssHeading.heading },
      componentFactory: createHeading,
    },
  },
  heading_backToChats: {
    type: "single",
    data: {
      configs: {
        slotKey: "heading_backToChats",
        tagName: "h1",
        text: "⮘ Назад",
        isClickable: true,
        link: RouteLink.Chats,
      },
      attributes: { className: cssHeading.heading },
      componentFactory: createHeading,
    },
  },
  inputEditors: {
    type: "list",
    slotKey: "inputEditors",
    childrenFactory: createInputEditor,
    dataList: [
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          id: "email",
          type: "email",
          label: "Эл. почта",
          placeholder: "pochta@yandex.ru",
        },
        attributes: { className: cssInput.inputEditLabel },
        componentFactory: createInput,
      },
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          id: "name",
          type: "text",
          label: "Имя",
          placeholder: "Иван",
        },
        attributes: { className: cssInput.inputEditLabel },
        componentFactory: createInput,
      },
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          id: "surname",
          type: "text",
          label: "Фамилия",
          placeholder: "Иванов",
        },
        attributes: { className: cssInput.inputEditLabel },
        componentFactory: createInput,
      },
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          id: "login",
          type: "text",
          label: "Логин",
          placeholder: "ivanov",
        },
        attributes: { className: cssInput.inputEditLabel },
        componentFactory: createInput,
      },
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          id: "display_name",
          type: "text",
          label: "Имя в чате",
          placeholder: "Vanya",
        },
        attributes: { className: cssInput.inputEditLabel },
        componentFactory: createInput,
      },
      {
        configs: {
          slotKey: "input",
          tagName: "label",
          id: "phone",
          type: "tel",
          label: "Номер телефона",
          placeholder: "8905551234",
        },
        attributes: { className: cssInput.inputEditLabel },
        componentFactory: createInput,
      },
    ],
  },
  buttonEditInfo: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonEditInfo",
        tagName: "button",
        label: "Изменить данные",
        type: "submit",
      },
      attributes: { className: cssBtn.button, type: "submit" },
      componentFactory: createButton,
    },
  },
  buttonEditPassword: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonEditPassword",
        tagName: "button",
        label: "Изменить пароль",
        type: "button",
      },
      attributes: { className: cssBtn.button },
      componentFactory: createButton,
    },
  },
  buttonLogout: {
    type: "single",
    data: {
      configs: {
        slotKey: "buttonLogout",
        tagName: "button",
        label: "Выйти",
        type: "button",
        isSilent: true,
      },
      attributes: {
        className: `${cssBtn.button} ${cssBtn.button_silent}`,
      },
      componentFactory: createButton,
    },
  },
};

export const profilePageData: ProfilePageProps = {
  configs: {
    slotKey: "profilePage",
    tagName: "form",
    profileName: "Vanya",
    profileAvatar: profileAvatar,
  },
  attributes: {
    className: `${cssPages.moduleWindow} ${cssProfile.moduleWindow_profile}`,
  },
  childrenData: profileChildrenData,
};

export const profilePageRouteConfig = {
  path: RouteLink.Profile,
  rootQuery: "#app",
};
