import "./index.css";
import Router from "./src/core/Router/Router.ts";
import { createAuthPage } from "./src/pages/auth/AuthPage.ts";
import {
  signInData,
  signInRouteConfig,
  signUpData,
  signUpRouteConfig,
} from "./src/pages/auth/data.ts";
import { createChatPage } from "./src/pages/chat/ChatPage.ts";
import { chatPageData, chatPageRouteConfig } from "./src/pages/chat/data.ts";
import {
  error404RouteConfig,
  error500RouteConfig,
  errorPage404Data,
  errorPage500Data,
} from "./src/pages/errors/data.ts";
import { createErrorPage } from "./src/pages/errors/ErrorPage.ts";
import {
  profilePageData,
  profilePageRouteConfig,
} from "./src/pages/profile/data.ts";
import { createProfilePage } from "./src/pages/profile/ProfilePage.ts";

export const rootQuery = "#app";

Router
  /* SignIn route */
  .use(signInRouteConfig, () => createAuthPage(signInData),)
  /* SignUp route */
  .use(signUpRouteConfig, () => createAuthPage(signUpData))
  /* Chats route */
  .use(chatPageRouteConfig, () => createChatPage(chatPageData))
  /* Profile route */
  .use(profilePageRouteConfig, () => createProfilePage(profilePageData))
  /* NotFound route */
  .use(error404RouteConfig, () => createErrorPage(errorPage404Data))
  /* Error route */
  .use(error500RouteConfig, () => createErrorPage(errorPage500Data));

Router.start(rootQuery);
