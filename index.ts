import "./index.css";
import Router from "./src/core/Router/Router.ts";
import { createAuthPage } from "./src/pages/auth/AuthPage.ts";
import {
  signInData,
  signInRouteConfig,
  signUpData,
  signUpRouteConfig,
} from "./src/pages/auth/data.ts";

export const rootQuery = "#app";

Router.use(signUpRouteConfig, () => createAuthPage(signUpData)).use(
  signInRouteConfig,
  () => createAuthPage(signInData),
);

Router.start(rootQuery);
