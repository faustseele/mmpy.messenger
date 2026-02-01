/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleGuestMode } from "@/features/authenticate/model/actions.ts";
import { cx } from "@/shared/lib/helpers/formatting/classnames.ts";
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
import css from "../ui/auth.module.css"

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
    classNames: cx(cssPage.moduleWindow, css.moduleWindow_auth),
    type: "sign-in",
  },
  children: {
    nodes: {
      ...(inputs_signIn as any),
      heading: getHeadingNode("heading", "Вход 🚪"),
      buttonFormSubmit: getButtonNode("buttonFormSubmit", "Войти ✓", {
        type: "submit",
      }),
      buttonGuest: getButtonNode("buttonGuest", "👻 Guest", {
        on: {
          click: handleGuestMode,
        },
      }),
      buttonReroute: getButtonNode("buttonReroute", "Впервые?", {
        isSilent: true,
        on: {
          click: () => handleReroute("sign-in"),
        },
      }),
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonGuest: "buttonGuest",
      buttonReroute: "buttonReroute",
      inputs: ["input-login", "input-password"],
    },
  },
};

const authPageParams_signUp: ComponentParams<AuthProps> = {
  configs: {
    id: PageId.SignUp,
    rootTag: "form",
    classNames: cx(cssPage.moduleWindow, css.moduleWindow_auth),
    type: "sign-up",
  },
  children: {
    nodes: {
      ...(inputs_signUp as any),
      heading: getHeadingNode("heading", "Регистрация 🎀"),
      buttonFormSubmit: getButtonNode(
        "buttonFormSubmit",
        "Зарегистрироваться ✓", {
          type: "submit",
        }
      ),
      buttonGuest: getButtonNode("buttonGuest", "👻 Guest", {
        on: {
          click: handleGuestMode,
        },
      }),
      buttonReroute: getButtonNode("buttonReroute", "Я свой!", {
        isSilent: true,
        on: {
          click: () => handleReroute("sign-up"),
        },
      }),
    },
    edges: {
      heading: "heading",
      buttonFormSubmit: "buttonFormSubmit",
      buttonGuest: "buttonGuest",
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
