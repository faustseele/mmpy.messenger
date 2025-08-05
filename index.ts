import "./index.css";
import Router from "./src/core/Router/Router.ts";
import {
  signInData,
  signInRouteConfig,
  signUpData,
  signUpRouteConfig,
} from "./src/pages/auth/data.ts";

export const rootQuery = "#app";

Router.use(signUpData, signUpRouteConfig).use(signInData, signInRouteConfig);

Router.start(rootQuery);
