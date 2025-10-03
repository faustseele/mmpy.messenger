import cssPages from "../pages.module.css";
import { ProfilePageConfigs, ProfileChildrenDataPropsMap } from "../../../pages/profile/model/types.ts";
import cssProfile from "./profile.module.css";
import { RouteLink, RouteConfigs } from "../../../app/providers/router/types.ts";
import { createInputEditor } from "../../../features/edit-profile/ui/InputEditor.ts";
import { ChildrenData } from "../../lib/Component/model/children.types.ts";
import { BaseProps } from "../../lib/Component/model/types.ts";
import { createButton } from "../../ui/Button/Button.ts";
import { createHeading } from "../../ui/Heading/Heading.ts";
import { createInput } from "../../ui/Input/Input.ts";

interface ProfilePageProps extends BaseProps {
  configs: ProfilePageConfigs;
  childrenData?: ChildrenData<ProfileChildrenDataPropsMap>;
}

const profileChildrenData: ChildrenData<ProfileChildrenDataPropsMap> = {
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
        attributes: { className: cssInput.inputLabelWrap },
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
        attributes: { className: cssInput.inputLabelWrap },
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
        attributes: { className: cssInput.inputLabelWrap },
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
        attributes: { className: cssInput.inputLabelWrap },
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
        attributes: { className: cssInput.inputLabelWrap },
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
        attributes: { className: cssInput.inputLabelWrap },
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

export const profilePageRouteConfig: RouteConfigs = {
  path: RouteLink.Settings,
  rootQuery: "#app",
  authStatus: "protected",
  params: {},
};
