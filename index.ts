import "./index.css";
import Router from "./src/app/providers/router/Router.ts";
import { createAuthPage } from "./src/pages/auth/ui/AuthPage.ts";
import { createChatPage } from "./src/pages/chat/ui/ChatPage.ts";
import { createErrorPage } from "./src/pages/errors/ui/ErrorPage.ts";
import { createProfilePage } from "./src/pages/profile/ui/ProfilePage.ts";
import { signInData, signInRouteConfig, signUpData, signUpRouteConfig } from "./src/shared/config/mocks/auth.ts";
import { chatPageData, chatPageRouteConfig } from "./src/shared/config/mocks/chat.ts";
import {
  error404RouteConfig,
  error500RouteConfig,
  errorPage404Data,
  errorPage500Data,
} from "./src/shared/config/mocks/errors.ts";
import {
  profilePageData,
  profilePageRouteConfig,
} from "./src/shared/config/mocks/profile.ts";

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
