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
import cssPage from "../../../pages/page/ui/page.module.css";

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
  makeInputInit("phone", "Телефон", "tel", "Номер телефона"),
];

const signInInputsInit: InputInit[] = [
  makeInputInit("login", "Логин", "text"),
  makeInputInit("password", "Пароль", "password"),
];

const signUpSchema: AuthSchema = {
  singles: {
    heading: {
      init: copyHeadingInit({
        tagName: "h1",
        type: "auth/sign-up",
        text: "Регистрация 🎀",
      }),
      factory: createHeading,
      instanceType: emptyHeadingInstance,
    },
    buttonFormSubmit: {
      init: copyButtonInit(
        {
          label: "Зарегистрироваться ✓",
          tagName: "button",
          type: "submit",
        },
        cssBtn.button,
      ),
      factory: createButton,
      instanceType: emptyButtonInstance,
    },
    buttonReroute: {
      init: copyButtonInit(
        {
          label: "Я свой!",
          tagName: "button",
          type: "button",
          link: RouteLink.SignIn,
        },
        `${cssBtn.button} ${cssBtn.button_silent}`,
      ),
      factory: createButton,
      instanceType: emptyButtonInstance,
    },
  },
  lists: {
    inputs: {
      init: signUpInputsInit,
      factory: createInput,
      instanceType: [] as Input[],
    },
  },
};

const signInSchema: AuthSchema = {
  singles: {
    heading: {
      init: copyHeadingInit({
        tagName: "h1",
        type: "auth/sign-in",
        text: "Вход 🚪",
      }),
      factory: createHeading,
      instanceType: emptyHeadingInstance,
    },
    buttonFormSubmit: {
      init: copyButtonInit(
        {
          label: "Войти ✓",
          tagName: "button",
          type: "submit",
        },
        cssBtn.button,
      ),
      factory: createButton,
      instanceType: emptyButtonInstance,
    },
    buttonReroute: {
      init: copyButtonInit(
        {
          label: "Впервые?",
          tagName: "button",
          type: "button",
          link: RouteLink.SignUp,
        },
        `${cssBtn.button} ${cssBtn.button_silent}`,
      ),
      factory: createButton,
      instanceType: emptyButtonInstance,
    },
  },
  lists: {
    inputs: {
      init: signInInputsInit,
      factory: createInput,
      instanceType: [] as Input[],
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
