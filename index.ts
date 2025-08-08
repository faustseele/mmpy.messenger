import "./index.css";
import Router from "./src/core/Router/Router.ts";
import { createAuthPage } from "./src/pages/auth/AuthPage.ts";
import {
  signInData,
  signInRouteConfig,
  signUpData,
  signUpRouteConfig,
} from "./src/pages/auth/data.ts";
import { chatPageRouteConfig, chatPageData } from "./src/pages/chat/data.ts";
import { createChatPage } from "./src/pages/chat/ChatPage.ts";
import {
  profilePageRouteConfig,
  profilePageData,
} from "./src/pages/profile/data.ts";
import { createProfilePage } from "./src/pages/profile/ProfilePage.ts";

export const rootQuery = "#app";

Router
  /* SignIn route */
  .use(signInRouteConfig, () => createAuthPage(signUpData))
  /* SignUp route */
  .use(signUpRouteConfig, () => createAuthPage(signInData))
  /* Chats route */
  .use(chatPageRouteConfig, () => createChatPage(chatPageData))
  /* Profile route */
  .use(profilePageRouteConfig, () => createProfilePage(profilePageData));
/* NotFound route */

Router.start(rootQuery);
