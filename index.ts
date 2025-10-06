import "./src/app/styles/index.css";
import {
  chatPageData,
  chatPageRouteConfig,
} from "./src/shared/config/mocks/chat.ts";
import {
  ChatMap,
  ChatProps,
  ChatSchema,
} from "./src/pages/chat/model/types.ts";
import { createChatPage } from "./src/pages/chat/ui/ChatPage.ts";
import Router from "./src/app/providers/router/Router.ts";
import {
  AuthMap,
  AuthProps,
  AuthSchema,
} from "./src/pages/auth/model/types.ts";
import { createAuthPage } from "./src/pages/auth/ui/AuthPage.ts";
import {
  ProfileMap,
  ProfileProps,
  ProfileSchema,
} from "./src/pages/profile/model/types.ts";
import { createProfilePage } from "./src/pages/profile/ui/ProfilePage.ts";
import {
  signInData,
  signInRouteConfig,
  signUpData,
  signUpRouteConfig,
} from "./src/shared/config/mocks/auth.ts";
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
import {
  ErrorMap,
  ErrorProps,
  ErrorSchema,
} from "./src/pages/errors/model/types.ts";
import { createErrorPage } from "./src/pages/errors/ui/ErrorPage.ts";

export const rootQuery = "#app";

Router
  /* SignIn route */
  .use<AuthProps, AuthMap, AuthSchema>(signInRouteConfig, () =>
    createAuthPage(signInData),
  )
  /* SignUp route */
  .use<AuthProps, AuthMap, AuthSchema>(signUpRouteConfig, () =>
    createAuthPage(signUpData),
  )
  /* Chats route */
  .use<ChatProps, ChatMap, ChatSchema>(chatPageRouteConfig, () =>
    createChatPage(chatPageData),
  )
  /* Profile route */
  .use<ProfileProps, ProfileMap, ProfileSchema>(profilePageRouteConfig, () =>
    createProfilePage(profilePageData),
  )
  /* NotFound route */
  .use<ErrorProps, ErrorMap, ErrorSchema>(error404RouteConfig, () =>
    createErrorPage(errorPage404Data),
  )
  /* Error route */
  .use<ErrorProps, ErrorMap, ErrorSchema>(error500RouteConfig, () =>
    createErrorPage(errorPage500Data),
  );

Router.start(rootQuery);
