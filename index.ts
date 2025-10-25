import Router from "./src/app/providers/router/Router.ts";
import "./src/app/styles/index.css";
import {
  createAuthPage_signIn,
  createAuthPage_signUp,
  signInRouteConfig,
  signUpRouteConfig,
} from "./src/pages/auth/config/params.ts";
import {
  errorRouteConfig_404,
  errorRouteConfig_500,
} from "./src/pages/errors/config/params.ts";
import {
  createErrorPage_404,
  createErrorPage_500,
} from "./src/pages/errors/ui/ErrorPage.ts";
import { createMessengerPage, messengerPageRouteConfig } from "./src/pages/messenger/config/params.ts";
import { createSettingsPage, settingsPageRouteConfig } from "./src/pages/settings/config/params.ts";

export const rootQuery = "#app";

Router
  /* SignIn route */
  .use(signInRouteConfig, () => createAuthPage_signIn)
  /* SignUp route */
  .use(signUpRouteConfig, () => createAuthPage_signUp)
  /* Messenger route */
  .use(messengerPageRouteConfig, () => createMessengerPage)
  /* Settings route */
  .use(settingsPageRouteConfig, () => createSettingsPage)
  /* NotFound route */
  .use(errorRouteConfig_404, () => createErrorPage_404)
  /* Error route */
  .use(errorRouteConfig_500, () => createErrorPage_500);

Router.start(rootQuery);
