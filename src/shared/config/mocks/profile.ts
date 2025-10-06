import profileAvatar from "../../../../static/profile-avatar.png";
import {
  RouteConfigs,
  RouteLink,
} from "../../../app/providers/router/types.ts";
import {
  ComponentData,
  ComponentInit,
} from "../../lib/Component/model/types.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import {
  ProfileMap,
  ProfileProps,
  ProfileSchema,
} from "../../../pages/profile/model/types.ts";
import { FieldType } from "../../lib/helpers/input/types.ts";
import {
  InputEditor,
  createInputEditor,
} from "../../../features/edit-profile/ui/InputEditor.ts";
import { Button, createButton } from "../../ui/Button/Button.ts";
import { ButtonProps } from "../../ui/Button/types.ts";
import { Heading, createHeading } from "../../ui/Heading/Heading.ts";
import { HeadingProps } from "../../ui/Heading/types.ts";
import { InputProps } from "../../ui/Input/Input.ts";
import cssBtn from "../../ui/Button/button.module.css";
import cssHeading from "../../ui/Heading/heading.module.css";
import cssInput from "../../ui/Input/input.module.css";
import cssPage from "../../../pages/page/ui/page.module.css";
import cssProfile from "../../../pages/profile/ui/profile.module.css";

/* Component init helpers */
type HeadingInit = ComponentInit<HeadingProps>;
type ButtonInit = ComponentInit<ButtonProps>;
type InputInit = ComponentInit<InputProps>;

type HeadingConfigs = HeadingProps["configs"];
type ButtonConfigs = ButtonProps["configs"];
type InputConfigs = InputProps["configs"];

const headingInstance = null as unknown as Heading;
const buttonInstance = null as unknown as Button;
const inputEditorListInstance = [] as InputEditor[];

const inputEditorFactory: ComponentFactory<InputProps, InputEditor> = (data) =>
  createInputEditor(data) as InputEditor;

const makeHeadingInit = (
  configs: HeadingConfigs,
  className: string,
): HeadingInit => ({
  configs: { ...configs },
  attributes: {
    className,
  },
});

const makeButtonInit = (
  configs: ButtonConfigs,
  className: string,
): ButtonInit => ({
  configs: { ...configs },
  attributes: {
    type: configs.type,
    className,
  },
});

const makeInputEditorInit = (
  field: FieldType,
  label: string,
  placeholder: string,
  type: InputConfigs["type"],
): InputInit => ({
  configs: {
    tagName: "label",
    label,
    type,
    isError: false,
    name: field,
    id: field,
    errorMessage: "",
    placeholder,
  },
  attributes: {
    className: cssInput.inputLabelWrap,
    for: field,
  },
});

const profileInputsInit: InputInit[] = [
  makeInputEditorInit("email", "Эл. почта", "pochta@yandex.ru", "email"),
  makeInputEditorInit("name", "Имя", "Иван", "text"),
  makeInputEditorInit("surname", "Фамилия", "Иванов", "text"),
  makeInputEditorInit("login", "Логин", "ivanov", "text"),
  makeInputEditorInit("display_name", "Имя в чате", "Vanya", "text"),
  makeInputEditorInit("phone", "Номер телефона", "+7 905 551-23-45", "tel"),
];

const profileSchema: ProfileSchema = {
  singles: {
    heading_profile: {
      init: makeHeadingInit(
        {
          tagName: "h1",
          type: "profile-title",
          text: "Профиль 👤",
        },
        cssHeading.heading,
      ),
      factory: createHeading,
      instanceType: headingInstance,
    },
    heading_backToChats: {
      init: makeHeadingInit(
        {
          tagName: "h1",
          type: "profile-back",
          text: "⮘ Назад",
          isClickable: true,
          link: RouteLink.Chats,
        },
        `${cssHeading.heading} ${cssHeading.heading__text_clickable}`,
      ),
      factory: createHeading,
      instanceType: headingInstance,
    },
    buttonEditInfo: {
      init: makeButtonInit(
        {
          label: "Изменить данные",
          tagName: "button",
          type: "submit",
        },
        cssBtn.button,
      ),
      factory: createButton,
      instanceType: buttonInstance,
    },
    buttonEditPassword: {
      init: makeButtonInit(
        {
          label: "Изменить пароль",
          tagName: "button",
          type: "button",
        },
        cssBtn.button,
      ),
      factory: createButton,
      instanceType: buttonInstance,
    },
    buttonLogout: {
      init: makeButtonInit(
        {
          label: "Выйти",
          tagName: "button",
          type: "button",
        },
        `${cssBtn.button} ${cssBtn.button_silent}`,
      ),
      factory: createButton,
      instanceType: buttonInstance,
    },
  },
  lists: {
    inputsEditors: {
      init: profileInputsInit,
      factory: inputEditorFactory,
      instanceType: inputEditorListInstance,
    },
  },
};

export const profilePageData: ComponentData<
  ProfileProps,
  ProfileMap,
  ProfileSchema
> = {
  configs: {
    tagName: "div",
    profileName: "Vanya",
    profileAvatar,
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssProfile.moduleWindow_profile}`,
  },
  childrenSchema: profileSchema,
};

export const profilePageRouteConfig: RouteConfigs = {
  path: RouteLink.Settings,
  rootQuery: "#app",
  authStatus: "protected",
  params: {},
};
