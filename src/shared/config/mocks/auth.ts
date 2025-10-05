import { RouteConfigs, RouteLink } from "../../../app/providers/router/types.ts";
import {
  ComponentData,
  ComponentInit,
} from "../../lib/Component/model/types.ts";
import { FieldType } from "../../lib/helpers/input/types.ts";
import {
  AuthMap,
  AuthProps,
  AuthSchema,
} from "../../../pages/auth/model/types.ts";
import { Button, createButton } from "../../ui/Button/Button.ts";
import { ButtonProps } from "../../ui/Button/types.ts";
import { Heading, createHeading } from "../../ui/Heading/Heading.ts";
import { HeadingProps } from "../../ui/Heading/types.ts";
import { Input, InputProps, createInput } from "../../ui/Input/Input.ts";
import cssBtn from "../../ui/Button/button.module.css";
import cssHeading from "../../ui/Heading/heading.module.css";
import cssInput from "../../ui/Input/input.module.css";
import cssPage from "../../../pages/page/ui/pages.module.css";

type HeadingInit = ComponentInit<HeadingProps>;
type ButtonInit = ComponentInit<ButtonProps>;
type InputInit = ComponentInit<InputProps>;

type HeadingConfigs = HeadingProps["configs"];
type ButtonConfigs = ButtonProps["configs"];

const emptyHeadingInstance = null as unknown as Heading;
const emptyButtonInstance = null as unknown as Button;

const copyHeadingInit = (configs: HeadingConfigs): HeadingInit => ({
  configs: { ...configs },
  attributes: {
    className: cssHeading.heading,
  },
});

const copyButtonInit = (configs: ButtonConfigs, className: string): ButtonInit => ({
  configs: { ...configs },
  attributes: {
    type: configs.type,
    className,
  },
});

const buildInputAttributes = (
  field: FieldType,
): NonNullable<InputProps["attributes"]> => ({
  className: cssInput.inputLabelWrap,
  for: field,
});

const makeInputInit = (
  field: FieldType,
  label: string,
  type: InputProps["configs"]["type"],
  placeholder = label,
): InputInit => ({
  configs: {
    slotKey: "input",
    tagName: "label",
    label,
    type,
    isError: false,
    name: field,
    id: field,
    errorMessage: "",
    placeholder,
  },
  attributes: buildInputAttributes(field),
});

const signUpInputsInit: InputInit[] = [
  makeInputInit("name", "Имя", "text"),
  makeInputInit("surname", "Фамилия", "text"),
  makeInputInit("login", "Логин", "text"),
  makeInputInit("email", "Эл. почта", "email"),
  makeInputInit("password", "Пароль", "password"),
  makeInputInit("phone", "Телефон", "tel", "+7 (999) 000-00-00"),
];

const signInInputsInit: InputInit[] = [
  makeInputInit("login", "Логин", "text"),
  makeInputInit("password", "Пароль", "password"),
];

const signUpSchema: AuthSchema = {
  singles: {
    heading: {
      init: copyHeadingInit({
        slotKey: "heading",
        tagName: "h1",
        type: "auth/sign-up",
        text: "Регистрация",
      }),
      factory: createHeading,
      instance: emptyHeadingInstance,
    },
    buttonFormSubmit: {
      init: copyButtonInit(
        {
          slotKey: "buttonFormSubmit",
          label: "Создать аккаунт",
          tagName: "button",
          type: "submit",
        },
        cssBtn.button,
      ),
      factory: createButton,
      instance: emptyButtonInstance,
    },
    buttonReroute: {
      init: copyButtonInit(
        {
          slotKey: "buttonReroute",
          label: "Уже есть аккаунт?",
          tagName: "button",
          type: "button",
          link: RouteLink.SignIn,
        },
        `${cssBtn.button} ${cssBtn.button_silent}`,
      ),
      factory: createButton,
      instance: emptyButtonInstance,
    },
  },
  lists: {
    inputs: {
      init: signUpInputsInit,
      factory: createInput,
      instance: [] as Input[],
    },
  },
};

const signInSchema: AuthSchema = {
  singles: {
    heading: {
      init: copyHeadingInit({
        slotKey: "heading",
        tagName: "h1",
        type: "auth/sign-in",
        text: "Вход",
      }),
      factory: createHeading,
      instance: emptyHeadingInstance,
    },
    buttonFormSubmit: {
      init: copyButtonInit(
        {
          slotKey: "buttonFormSubmit",
          label: "Войти",
          tagName: "button",
          type: "submit",
        },
        cssBtn.button,
      ),
      factory: createButton,
      instance: emptyButtonInstance,
    },
    buttonReroute: {
      init: copyButtonInit(
        {
          slotKey: "buttonReroute",
          label: "Создать аккаунт",
          tagName: "button",
          type: "button",
          link: RouteLink.SignUp,
        },
        `${cssBtn.button} ${cssBtn.button_silent}`,
      ),
      factory: createButton,
      instance: emptyButtonInstance,
    },
  },
  lists: {
    inputs: {
      init: signInInputsInit,
      factory: createInput,
      instance: [] as Input[],
    },
  },
};

const createFormAttributes = (): NonNullable<AuthProps["attributes"]> => ({
  className: cssPage.moduleWindow,
});

export const signUpData: ComponentData<AuthProps, AuthMap, AuthSchema> = {
  configs: {
    tagName: "form",
    type: "sign-up",
  },
  attributes: createFormAttributes(),
  childrenSchema: signUpSchema,
};

export const signInData: ComponentData<AuthProps, AuthMap, AuthSchema> = {
  configs: {
    tagName: "form",
    type: "sign-in",
  },
  attributes: createFormAttributes(),
  childrenSchema: signInSchema,
};

export const signUpRouteConfig: RouteConfigs = {
  path: RouteLink.SignUp,
  rootQuery: "#app",
  authStatus: "guest",
  params: {},
};

export const signInRouteConfig: RouteConfigs = {
  path: RouteLink.SignIn,
  rootQuery: "#app",
  authStatus: "guest",
  params: {},
};
