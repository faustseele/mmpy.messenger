import { Button, ButtonProps } from "../components/button/Button.ts";
import {
  CatalogueItem,
  CatalogueItemProps,
} from "../components/catalogueItem/CatalogueItem.ts";
import { Heading, HeadingProps } from "../components/heading/Heading.ts";
import { Input, InputProps } from "../components/input/Input.ts";
import {
  InputEditor,
  InputEditorProps,
} from "../components/input/InputEditor.ts";
import { Message, MessageProps } from "../components/message/Message.ts";
import {
  MessageField,
  MessageFieldProps,
} from "../components/messageField/MessageField.ts";
import {
  Subheading,
  SubheadingProps,
} from "../components/subheading/Subheading.ts";
import Router from "../core/Router/Router.ts";
import { TAuthPage } from "../pages/auth/auth.d";
import { AuthPage } from "../pages/auth/AuthPage.ts";
import { signInData, signUpData } from "../pages/auth/data.ts";
import { ChatPage } from "../pages/chat/ChatPage.ts";
import { chatData } from "../pages/chat/data.ts";
import { errorData404, errorData500 } from "../pages/errors/data.ts";
import { ErrorPage } from "../pages/errors/ErrorPage.ts";
import { TErrorPage } from "../pages/errors/errors.d";
import { profileData } from "../pages/profile/data.ts";
import { ProfilePage } from "../pages/profile/ProfilePage.ts";

/**
 * This is a utility-file with factory functions.
 * Factory functions inject dependencies into the concrete Components.
 * TODO: Add a type-guard for the factory functions
 */

export function createAuthPage(type: TAuthPage, router: Router): AuthPage {
  let authData = undefined;
  if (type === "/sign-in") authData = signInData;
  if (type === "/sign-up") authData = signUpData;

  if (!authData) {
    console.error("Bad auth-page type", type);
    authData = signUpData;
  }

  return new AuthPage(router, { configs: authData });
}

export function createButton(props: ButtonProps): Button {
  return new Button(props);
}

export function createHeading(props: HeadingProps): Heading {
  return new Heading(props);
}

export function createInput(props: InputProps): Input {
  return new Input(props);
}

export function createInputEditor(props: InputEditorProps): InputEditor {
  return new InputEditor(props);
}

export function createMessageField(props: MessageFieldProps): MessageField {
  return new MessageField(props);
}

export function createChatPage(): ChatPage {
  return new ChatPage({ configs: chatData });
}

export function createProfilePage(): ProfilePage {
  return new ProfilePage({ configs: profileData });
}

export function createCatalogueItem(props: CatalogueItemProps): CatalogueItem {
  return new CatalogueItem(props);
}

export function createMessage(props: MessageProps): Message {
  return new Message(props);
}

export function createSubheading(props: SubheadingProps): Subheading {
  return new Subheading(props);
}

export function createErrorPage(type: TErrorPage): ErrorPage {
  let errorData = undefined;
  if (type === "404") errorData = errorData404;
  if (type === "500") errorData = errorData500;

  if (!errorData) {
    errorData = errorData404;
    console.error("Bad error-page type", type);
  }

  return new ErrorPage({ configs: errorData });
}
