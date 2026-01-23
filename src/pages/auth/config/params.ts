/* eslint-disable @typescript-eslint/no-explicit-any */
import { getButtonNode } from "@/shared/ui/Button/factory.ts";
import { getHeadingNode } from "@/shared/ui/Heading/factory.ts";
import { getInputNode } from "@/shared/ui/Input/factory.ts";
import { RouteConfigs } from "@app/providers/router/types.ts";
import { PageId } from "@pages/page/config/const.ts";
import { PageNode } from "@pages/page/model/types.ts";
import cssPage from "@pages/page/ui/page.module.css";
import { ROOT_QUERY } from "@shared/config/dom.ts";
import { ComponentParams } from "@shared/lib/Component/model/types.ts";
import { RouteLink } from "@shared/types/universal.ts";
import { handleReroute } from "../model/actions.ts";
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

const inputs_signUp = {
  "input-name": getInputNode(iptIds[0], "name", "Имя"),
  "input-surname": getInputNode(iptIds[1], "surname", "Фамилия"),
  "input-login": getInputNode(iptIds[2], "login", "Логин"),
  "input-email": getInputNode(iptIds[3], "email", "Эл. почта"),
  "input-password": getInputNode(iptIds[4], "password", "Пароль"),
  "input-phone": getInputNode(iptIds[5], "phone", "Телефон"),
};

const inputs_signIn = {
  "input-login": getInputNode(iptIds[2], "login", "Логин"),
  "input-password": getInputNode(iptIds[4], "password", "Пароль"),
};

const authPageParams_signIn: ComponentParams<AuthProps> = {
  configs: {
    id: PageId.SignIn,
    rootTag: "form",
    classNames: cssPage.moduleWindow,
    type: "sign-in",
  },
  children: {
    nodes: {
      ...(inputs_signIn as any),
      heading: getHeadingNode("heading", "Вход 🚪") as any,
      buttonFormSubmit: getButtonNode("buttonFormSubmit", "Войти ✓", {
        type: "submit",
      }) as any,
      buttonReroute: getButtonNode("buttonReroute", "Впервые?", {
        isSilent: true,
        on: {
          click: () => handleReroute("sign-in"),
        },
      }) as any,
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonReroute: "buttonReroute",
      inputs: ["input-login", "input-password"],
    },
  },
};

const authPageParams_signUp: ComponentParams<AuthProps> = {
  configs: {
    id: PageId.SignUp,
    rootTag: "form",
    classNames: cssPage.moduleWindow,
    type: "sign-up",
  },
  children: {
    nodes: {
      ...(inputs_signUp as any),
      heading: getHeadingNode("heading", "Регистрация 🎀") as any,
      buttonFormSubmit: getButtonNode(
        "buttonFormSubmit",
        "Зарегистрироваться ✓",
      ) as any,
      buttonReroute: getButtonNode("buttonReroute", "Я свой!", {
        isSilent: true,
        on: {
          click: () => handleReroute("sign-up"),
        },
      }) as any,
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonReroute: "buttonReroute",
      inputs: [
        "input-name",
        "input-surname",
        "input-login",
        "input-email",
        "input-password",
        "input-phone",
      ],
    },
  },
};

export const authPageNode_in: PageNode<AuthProps, AuthPage> = {
  params: authPageParams_signIn,
  factory: buildAuthPage as any,
};

export const authPageNode_up: PageNode<AuthProps, AuthPage> = {
  params: authPageParams_signUp,
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
