import { Button, ButtonProps } from "../components/button/Button.ts";
import { Heading, HeadingProps } from "../components/heading/Heading.ts";
import { Input, InputProps } from "../components/input/Input.ts";
import {
  InputEditor,
  InputEditorProps,
} from "../components/input/InputEditor.ts";
import { AuthPage } from "../pages/auth/AuthPage.ts";

/** This is a utility-file with factory functions.
 *  Factory functions inject dependencies into the concrete Components.
 */

export function createAuthPage(props: {
  configs: { isSignUp: boolean };
}): AuthPage {
  return new AuthPage(props);
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
