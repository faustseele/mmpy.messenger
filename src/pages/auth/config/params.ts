/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteConfigs } from "@app/providers/router/types.ts";
import { PageId } from "@pages/page/config/const.ts";
import { PageNode } from "@pages/page/model/types.ts";
import cssPage from "@pages/page/ui/page.module.css";
import { ROOT_QUERY } from "@shared/config/dom.ts";
import { ComponentParams } from "@shared/lib/Component/model/types.ts";
import { RouteLink } from "@shared/types/universal.ts";
import { getButtonNode } from "@shared/ui/Button/utils.ts";
import { getHeadingNode } from "@shared/ui/Heading/utils.ts";
import { getInputNode } from "@shared/ui/Input/utils.ts";
import { handleReroute, } from "../model/actions.ts";
import { buildAuthPage } from "../model/factory.ts";
import { AuthProps } from "../model/types.ts";
import type { AuthPage } from "../ui/AuthPage.ts";

const iptIds = [
  "input-name",
  "input-surname",
  "input-login",
  "input-email",
  "input-password",
  "input-phone",
];

const inputNodes_up = {
  [iptIds[0]]: getInputNode({
    id: iptIds[0],
    fieldId: "name",
    label: "Имя",
    type: "text",
    placeholder: "Имя",
  }),
  [iptIds[1]]: getInputNode({
    id: iptIds[1],
    fieldId: "surname",
    label: "Фамилия",
    type: "text",
    placeholder: "Фамилия",
  }),
  [iptIds[2]]: getInputNode({
    id: iptIds[2],
    fieldId: "login",
    label: "Логин",
    type: "text",
    placeholder: "Логин",
  }),
  [iptIds[3]]: getInputNode({
    id: iptIds[3],
    fieldId: "email",
    label: "Эл. почта",
    type: "email",
    placeholder: "Эл. почта",
  }),
  [iptIds[4]]: getInputNode({
    id: iptIds[4],
    fieldId: "password",
    label: "Пароль",
    type: "password",
    placeholder: "Пароль",
  }),
  [iptIds[5]]: getInputNode({
    id: iptIds[5],
    fieldId: "phone",
    label: "Телефон",
    type: "tel",
    placeholder: "Телефон",
  }),
};

const inputNodes_in = {
  [iptIds[2]]: getInputNode({
    id: iptIds[2],
    fieldId: "login",
    label: "Логин",
    type: "text",
    placeholder: "Логин",
  }),
  [iptIds[4]]: getInputNode({
    id: iptIds[4],
    fieldId: "password",
    label: "Пароль",
    type: "password",
    placeholder: "Пароль",
  }),
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
      heading: getHeadingNode({
        id: "heading",
        text: "Вход 🚪",
      }) as any,
      buttonFormSubmit: getButtonNode({
        id: "buttonFormSubmit",
        label: "Войти ✓",
        type: "submit",
      }) as any,
      buttonReroute: getButtonNode({
        id: "buttonReroute",
        label: "Впервые?",
        link: RouteLink.SignUp,
        isSilent: true,
      }) as any,
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonReroute: "buttonReroute",
      inputs: [iptIds[2], iptIds[4]],
    },
  },
  on: {
    reroute: handleReroute,
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
      heading: getHeadingNode({
        id: "heading",
        text: "Регистрация 🎀",
      }) as any,
      buttonFormSubmit: getButtonNode({
        id: "buttonFormSubmit",
        label: "Зарегистрироваться ✓",
        type: "submit",
      }) as any,
      buttonReroute: getButtonNode({
        id: "buttonReroute",
        label: "Я свой!",
        link: RouteLink.SignIn,
        isSilent: true,
      }) as any,
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonReroute: "buttonReroute",
      inputs: iptIds,
    },
  },
  on: {
    reroute: handleReroute,
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
  rootQuery: ROOT_QUERY,
  authStatus: "guest",
  params: {},
};

export const signInRouteConfig: RouteConfigs = {
  path: RouteLink.SignIn,
  rootQuery: ROOT_QUERY,
  authStatus: "guest",
  params: {},
};
