/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteConfigs } from "../../../app/providers/router/types.ts";
import { ROOT_QUERY } from "../../../shared/config/dom.ts";
import {
  ComponentParams
} from "../../../shared/lib/Component/model/types.ts";
import { RouteLink } from "../../../shared/types/universal.ts";
import {
  getButtonNode
} from "../../../shared/ui/Button/utils.ts";
import {
  getHeadingNode
} from "../../../shared/ui/Heading/utils.ts";
import { getSubheadingNode } from "../../../shared/ui/Subheading/utils.ts";
import { PageId } from "../../page/config/const.ts";
import cssPage from "../../page/ui/page.module.css";
import { ErrorProps } from "../model/types.ts";
import cssErrors from "../ui/errors.module.css";

export const errorPageParams_404: ComponentParams<ErrorProps> = {
  configs: {
    id: PageId.Error404,
    tagName: "div",
    code: "404",
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssErrors.moduleWindow_errors}`,
  },
  children: {
    nodes: {
      heading: getHeadingNode({
        id: "heading",
        type: "error/404",
        text: "⛔ Ошибка 404",
        isDrama: true,
      }) as any,
      subheading: getSubheadingNode({
        id: "subheading",
        text: "🌑 Не туда попали",
        isDrama: true,
      }) as any,
      button_back: getButtonNode({
        id: "button_back",
        label: "Назад к чатам",
        link: RouteLink.Messenger,
      }) as any,
    },
    edges: {
      heading: "heading",
      subheading: "subheading",
      button_back: "button_back",
    },
  },
};

export const errorPageParams_500: ComponentParams<ErrorProps> = {
  configs: {
    id: PageId.Error500,
    tagName: "div",
    code: "500",
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssErrors.moduleWindow_errors}`,
  },
  children: {
    nodes: {
      heading: getHeadingNode({
        id: "heading",
        type: "error/500",
        text: "🪜 Ошибка 500",
        isDrama: true,
      }) as any,
      subheading: getSubheadingNode({
        id: "subheading",
        text: "🔧 Мы уже фиксим",
        isDrama: true,
      }) as any,
      button_back: getButtonNode({
        id: "button_back",
        label: "Назад к чатам",
        link: RouteLink.Messenger,
      }) as any,
    },
    edges: {
      heading: "heading",
      subheading: "subheading",
      button_back: "button_back",
    },
  },
};


export const errorRouteConfig_404: RouteConfigs = {
  path: RouteLink.NotFound,
  rootQuery: ROOT_QUERY,
  authStatus: "any",
  params: {},
};

export const errorRouteConfig_500: RouteConfigs = {
  path: RouteLink.Error,
  rootQuery: ROOT_QUERY,
  authStatus: "any",
  params: {},
};
