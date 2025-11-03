import Router from "./src/app/providers/router/Router.ts";
import "./src/app/styles/index.css";
import {
  signInRouteConfig,
  signUpRouteConfig,
} from "./src/pages/auth/config/params.ts";
import { createAuthPage_signIn, createAuthPage_signUp } from "./src/pages/auth/model/factory.ts";
import {
  errorRouteConfig_404,
  errorRouteConfig_500,
} from "./src/pages/errors/config/params.ts";
import { createErrorPage_404, createErrorPage_500 } from "./src/pages/errors/model/factory.ts";
import { messengerPageRouteConfig } from "./src/pages/messenger/config/params.ts";
import { createMessengerPage } from "./src/pages/messenger/model/factory.ts";
import { settingsPageRouteConfig } from "./src/pages/settings/config/params.ts";
import { createSettingsPage } from "./src/pages/settings/model/factory.ts";

export const rootQuery = "#app";

Router
  /* SignIn route */
  .use(signInRouteConfig, createAuthPage_signIn)
  /* SignUp route */
  .use(signUpRouteConfig, createAuthPage_signUp)
  /* Messenger route */
  .use(messengerPageRouteConfig, createMessengerPage)
  /* Settings route */
  .use(settingsPageRouteConfig, createSettingsPage)
  /* NotFound route */
  .use(errorRouteConfig_404, createErrorPage_404)
  /* Error route */
  .use(errorRouteConfig_500, createErrorPage_500);

Router.start(rootQuery);
