import "./index.css";
import { RouteLink } from "./src/core/Router/router.d";
import Router from "./src/core/Router/Router.ts";
import { AuthPage } from "./src/pages/auth/AuthPage.ts";
import { signInData, signUpData } from "./src/pages/auth/data.ts";
import { ChatPage } from "./src/pages/chat/ChatPage.ts";
import { chatData } from "./src/pages/chat/data.ts";
import { errorData404, errorData500 } from "./src/pages/errors/data.ts";
import { ErrorPage } from "./src/pages/errors/ErrorPage.ts";
import { profileData } from "./src/pages/profile/data.ts";
import { ProfilePage } from "./src/pages/profile/ProfilePage.ts";

Router.use({
  pathname: RouteLink.SignIn,
  componentConstructor: AuthPage,
  optionalProps: {
    componentProps: { configs: signInData },
  },
}).use({
  pathname: RouteLink.SignUp,
  componentConstructor: AuthPage,
  optionalProps: {
    componentProps: { configs: signUpData },
  },
}).use({
  pathname: RouteLink.Chats,
  componentConstructor: ChatPage,
  optionalProps: {
    componentProps: { configs: chatData },
  },
}).use({
  pathname: RouteLink.Profile,
  componentConstructor: ProfilePage,
  optionalProps: {
    componentProps: { configs: profileData },
  },
}).use({
  pathname: RouteLink.NotFound,
  componentConstructor: ErrorPage,
  optionalProps: {
    componentProps: { configs: errorData404 },
  },
}).use({
  pathname: RouteLink.Error,
  componentConstructor: ErrorPage,
  optionalProps: {
    componentProps: { configs: errorData500 },
  },
}).start("#app");
