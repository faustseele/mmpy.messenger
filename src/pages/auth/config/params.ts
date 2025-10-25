/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteConfigs, RouteLink } from "../../../app/providers/router/types.ts";
import { connect } from "../../../app/providers/store/connect.ts";
import { ComponentParams } from "../../../shared/lib/Component/model/types.ts";
import {
  buildButton,
  getButtonProps,
} from "../../../shared/ui/Button/utils.ts";
import {
  buildHeading,
  getHeadingProps,
} from "../../../shared/ui/Heading/utils.ts";
import { buildInput, getInputProps } from "../../../shared/ui/Input/utils.ts";
import { PageId } from "../../page/config/const.ts";
import { PageNode } from "../../page/model/types.ts";
import cssPage from "../../page/ui/page.module.css";
import { AuthProps } from "../model/types.ts";
import { buildAuthPage, mapAuthState } from "../model/utils.ts";
import type { AuthPage } from "../ui/AuthPage.ts";

const iptIds = [
  "input-name",
  "input-surname",
  "input-login",
  "input-email",
  "input-password",
  "input-phone",
];

const iptIds_in = ["input-login", "input-password"];

const factory = buildInput as any;

const inputNodes_up = {
  [iptIds[0]]: {
    params: getInputProps({
      id: iptIds[0],
      fieldId: "name",
      label: "Имя",
      type: "text",
      placeholder: "Иван",
    }),
    factory,
  },
  [iptIds[1]]: {
    params: getInputProps({
      id: iptIds[1],
      fieldId: "surname",
      label: "Фамилия",
      type: "text",
      placeholder: "Фамилия",
    }),
    factory,
  },
  [iptIds[2]]: {
    params: getInputProps({
      id: iptIds[2],
      fieldId: "login",
      label: "Логин",
      type: "text",
      placeholder: "Логин",
    }),
    factory,
  },
  [iptIds[3]]: {
    params: getInputProps({
      id: iptIds[3],
      fieldId: "email",
      label: "Эл. почта",
      type: "email",
      placeholder: "Эл. почта",
    }),
    factory,
  },
  [iptIds[4]]: {
    params: getInputProps({
      id: iptIds[4],
      fieldId: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Пароль",
    }),
    factory,
  },
  [iptIds[5]]: {
    params: getInputProps({
      id: iptIds[5],
      fieldId: "phone",
      label: "Телефон",
      type: "tel",
      placeholder: "Телефон",
    }),
    factory,
  },
};

const inputNodes_in = {
  [iptIds_in[0]]: {
    ...inputNodes_up[iptIds[2]],
  },
  [iptIds_in[1]]: {
    ...inputNodes_up[iptIds[4]],
  },
};

const authPageParams_in: ComponentParams<AuthProps> = {
  configs: {
    id: PageId.SignIn,
    tagName: "form",
    type: "sign-in",
  },
  attributes: {
    className: cssPage.moduleWindow,
  },
  children: {
    nodes: {
      ...inputNodes_in,
      heading: {
        params: getHeadingProps({
          id: "heading",
          text: "Вход 🚪",
        }),
        factory: buildHeading as any,
      },
      buttonFormSubmit: {
        params: getButtonProps({
          id: "buttonFormSubmit",
          label: "Войти ✓",
          type: "submit",
        }),
        factory: buildButton as any,
      },
      buttonReroute: {
        params: getButtonProps({
          id: "buttonReroute",
          label: "Впервые?",
          link: RouteLink.SignUp,
        }),
        factory: buildButton as any,
      },
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonReroute: "buttonReroute",
      inputs: iptIds_in,
    },
  },
};

const authPageParams_up: ComponentParams<AuthProps> = {
  configs: {
    id: PageId.SignUp,
    tagName: "form",
    type: "sign-up",
  },
  attributes: {
    className: cssPage.moduleWindow,
  },
  children: {
    nodes: {
      ...inputNodes_up,
      heading: {
        params: getHeadingProps({
          id: "heading",
          text: "Регистрация 🎀",
        }),
        factory: buildHeading as any,
      },
      buttonFormSubmit: {
        params: getButtonProps({
          id: "buttonFormSubmit",
          label: "Зарегистрироваться ✓",
          type: "submit",
        }),
        factory: buildButton as any,
      },
      buttonReroute: {
        params: getButtonProps({
          id: "buttonReroute",
          label: "Я свой!",
          link: RouteLink.SignIn,
          isSilent: true,
        }),
        factory: buildButton as any,
      },
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonReroute: "buttonReroute",
      inputs: iptIds,
    },
  },
};

export const authPageNode_in: PageNode<AuthProps, AuthPage> = {
  params: authPageParams_in,
  factory: buildAuthPage as any,
};

export const authPageNode_up: PageNode<AuthProps, AuthPage> = {
  params: authPageParams_up,
  factory: buildAuthPage as any,
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

export const createAuthPage_signIn = connect(authPageNode_in, mapAuthState);
export const createAuthPage_signUp = connect(authPageNode_up, mapAuthState);
