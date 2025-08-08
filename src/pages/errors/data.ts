import cssBtn from "../../components/button/button.module.css";
import { createButton } from "../../components/button/Button.ts";
import { createHeading } from "../../components/heading/Heading.ts";
import cssSubheading from "../../components/subheading/subheading.module.css";
import { createSubheading } from "../../components/subheading/Subheading.ts";
import { RouteLink } from "../../core/Router/router.d";
import { IChildrenData } from "../../framework/Component/Children.d";
import { BaseProps } from "../../framework/Component/Component.d";
import pagesCss from "../pages.module.css";
import { ErrorChildrenDataPropsMap, IErrorPageConfigs } from "./errors.d";
import cssErr from "./errors.module.css";

interface ErrorPageProps extends BaseProps {
  configs: IErrorPageConfigs;
  childrenData?: IChildrenData<ErrorChildrenDataPropsMap>;
}

export const errorPage404Data: ErrorPageProps = {
  configs: {
    slotKey: "errorPage",
    tagName: "div",
    code: "404",
  },
  attributes: {
    className: `${pagesCss.moduleWindow} ${cssErr.moduleWindow_errors}`,
  },
  childrenData: {
    heading: {
      type: "single",
      data: {
        configs: {
          slotKey: "heading",
          tagName: "h1",
          text: "⛔ Ошибка 404",
          isDrama: true,
        },
        componentFactory: createHeading,
      },
    },
    subheading: {
      type: "single",
      data: {
        configs: {
          slotKey: "subheading",
          tagName: "h2",
          text: "🌑 Не туда попали",
        },
        attributes: {
          className: `${cssSubheading.subheading} ${cssSubheading.subheading_drama}`,
        },
        componentFactory: createSubheading,
      },
    },
    button: {
      type: "single",
      data: {
        configs: {
          slotKey: "button",
          tagName: "button",
          label: "Назад к чатам",
          type: "button",
          link: RouteLink.Chats,
        },
        attributes: { className: cssBtn.button },
        componentFactory: createButton,
      },
    },
  },
};

export const errorPage500Data: ErrorPageProps = {
  configs: {
    slotKey: "errorPage",
    tagName: "div",
    code: "500",
  },
  attributes: {
    className: `${pagesCss.moduleWindow} ${cssErr.moduleWindow_errors}`,
  },
  childrenData: {
    heading: {
      type: "single",
      data: {
        configs: {
          slotKey: "heading",
          tagName: "h1",
          text: "🪜 Ошибка 500",
          isDrama: true,
        },
        componentFactory: createHeading,
      },
    },
    subheading: {
      type: "single",
      data: {
        configs: {
          slotKey: "subheading",
          tagName: "h2",
          text: "🔧 Мы уже фиксим",
        },
        attributes: {
          className: `${cssSubheading.subheading} ${cssSubheading.subheading_drama}`,
        },
        componentFactory: createSubheading,
      },
    },
    button: {
      type: "single",
      data: {
        configs: {
          slotKey: "button",
          tagName: "button",
          label: "Назад к чатам",
          type: "button",
          link: RouteLink.Chats,
        },
        attributes: { className: cssBtn.button },
        componentFactory: createButton,
      },
    },
  },
};

export const error404RouteConfig = {
  path: RouteLink.NotFound,
  rootQuery: "#app",
};

export const error500RouteConfig = {
  path: RouteLink.Error,
  rootQuery: "#app",
};
