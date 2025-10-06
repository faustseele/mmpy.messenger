import { RouteConfigs, RouteLink } from "../../../app/providers/router/types.ts";
import {
  ErrorMap,
  ErrorProps,
  ErrorSchema,
} from "../../../pages/errors/model/types.ts";
import cssErrors from "../../../pages/errors/ui/errors.module.css";
import cssPage from "../../../pages/page/ui/page.module.css";
import {
  ComponentData,
  ComponentInit,
} from "../../lib/Component/model/types.ts";
import cssBtn from "../../ui/Button/button.module.css";
import { Button, createButton } from "../../ui/Button/Button.ts";
import { ButtonProps } from "../../ui/Button/types.ts";
import cssHeading from "../../ui/Heading/heading.module.css";
import { Heading, createHeading } from "../../ui/Heading/Heading.ts";
import { HeadingProps } from "../../ui/Heading/types.ts";
import cssSubheading from "../../ui/Subheading/subheading.module.css";
import { Subheading, createSubheading } from "../../ui/Subheading/Subheading.ts";
import { SubheadingProps } from "../../ui/Subheading/types.ts";

const headingInstance = null as unknown as Heading;
const subheadingInstance = null as unknown as Subheading;
const buttonInstance = null as unknown as Button;

type HeadingInit = ComponentInit<HeadingProps>;
type SubheadingInit = ComponentInit<SubheadingProps>;
type ButtonInit = ComponentInit<ButtonProps>;

type HeadingConfigs = HeadingProps["configs"];
type SubheadingConfigs = SubheadingProps["configs"];
type ButtonConfigs = ButtonProps["configs"];

const makeHeadingInit = (configs: HeadingConfigs): HeadingInit => ({
  configs: { ...configs },
  attributes: { className: cssHeading.heading },
});

const makeSubheadingInit = (configs: SubheadingConfigs): SubheadingInit => ({
  configs: { ...configs },
  attributes: {
    className: `${cssSubheading.subheading} ${cssSubheading.subheading_drama}`,
  },
});

const makeButtonInit = (configs: ButtonConfigs): ButtonInit => ({
  configs: { ...configs },
  attributes: {
    type: configs.type,
    className: cssBtn.button,
  },
});

const buildErrorSchema = (
  code: ErrorProps["configs"]["code"],
  headingText: string,
  subheadingText: string,
  buttonLink: RouteLink,
): ErrorSchema => ({
  singles: {
    heading: {
      init: makeHeadingInit({
        slotKey: "heading",
        tagName: "h1",
        text: headingText,
        isDrama: true,
        type: code,
      }),
      factory: createHeading,
      instanceType: headingInstance,
    },
    subheading: {
      init: makeSubheadingInit({
        slotKey: "subheading",
        tagName: "h2",
        text: subheadingText,
        type: code,
      }),
      factory: createSubheading,
      instanceType: subheadingInstance,
    },
    button_back: {
      init: makeButtonInit({
        slotKey: "button_back",
        tagName: "button",
        label: "Назад к чатам",
        type: "button",
        link: buttonLink,
      }),
      factory: createButton,
      instanceType: buttonInstance,
    },
  },
});

const buildErrorData = (
  code: ErrorProps["configs"]["code"],
  headingText: string,
  subheadingText: string,
  link: RouteLink,
): ComponentData<ErrorProps, ErrorMap, ErrorSchema> => ({
  configs: {
    tagName: "div",
    code,
  },
  attributes: {
    className: `${cssPage.moduleWindow} ${cssErrors.moduleWindow_errors}`,
  },
  childrenSchema: buildErrorSchema(code, headingText, subheadingText, link),
});

export const errorPage404Data = buildErrorData(
  "404",
  "⛔ Ошибка 404",
  "🌑 Не туда попали",
  RouteLink.Chats,
);

export const errorPage500Data = buildErrorData(
  "500",
  "🪜 Ошибка 500",
  "🔧 Мы уже фиксим",
  RouteLink.Chats,
);

export const error404RouteConfig: RouteConfigs = {
  path: RouteLink.NotFound,
  rootQuery: "#app",
  authStatus: "any",
  params: {},
};

export const error500RouteConfig: RouteConfigs = {
  path: RouteLink.Error,
  rootQuery: "#app",
  authStatus: "any",
  params: {},
};
