import Router from "@/app/providers/router/Router.ts";
import { RouteLink } from "@/shared/types/universal.ts";
import UserService from "@entities/user/model/UserService.ts";
import AuthService from "@features/authenticate/model/AuthService.ts";
import { InputEditor } from "@features/edit-profile/ui/InputEditor.ts";
import { AuthType } from "@pages/auth/model/types.ts";
import { Input } from "../../ui/Input/Input.ts";
import { FieldType } from "../../ui/Input/types.ts";
import { validateInputField } from "./utils.ts";

const logMessages = {
  formIsValid: "✅ Form is valid! Here it is 👇",
  formHasErrors: "❌ Hey! Form has errors.. Please correct them. 👆",
};

export default class FormValidator {
  private inputs: Input[] | InputEditor[];

  constructor(inputs: Input[] | InputEditor[]) {
    this.inputs = inputs;
  }

  public onInputBlur = (input: Input): void => {
    this._handleFieldValidation(input);
  };

  public onFormSubmit = async (
    event: Event,
    submitType: AuthType | "change-info" | "change-password",
  ): Promise<void> => {
    event.preventDefault();

    const targetInputs = this._filterInputsBySubmitType(
      submitType,
      this.inputs,
    );
    const isFormValid = this._handleFormValidation(targetInputs);

    if (isFormValid) {
      const formData = this._getFormData(targetInputs);
      console.log(logMessages.formIsValid, formData);

      /* cleans up inputs */
      targetInputs.forEach((input) => {
        input.cleanInput();
      });

      if (submitType === "sign-in") {
        const res = await AuthService.signIn({
          login: formData.login,
          password: formData.password,
        });

        if (res.ok) {
          Router.go(RouteLink.Messenger);
        } else {
          console.error("SignIn failed");
        }

        return;
      } else if (submitType === "sign-up") {
        const res = await AuthService.signUp({
          first_name: formData.name,
          second_name: formData.surname,
          login: formData.login,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
        if (res.ok) {
          Router.go(RouteLink.Messenger);
        } else {
          console.error("SignUp failed");
        }
      } else if (submitType === "change-info") {
        await UserService.updateProfile({
          first_name: formData.name,
          second_name: formData.surname,
          display_name: formData.display_name,
          login: formData.login,
          email: formData.email,
          phone: formData.phone,
        });
      } else if (submitType === "change-password") {
        await UserService.updatePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      }
      return;
    } else {
      console.log(logMessages.formHasErrors);
      event.stopPropagation();
    }
  };

  /* validates all inputs in the form
    and returns if the form is valid */
  private _handleFormValidation(inputs?: Input[] | InputEditor[]): boolean {
    if (!inputs) {
      console.error("FormValidator: Inputs are not defined");
      return false;
    }

    let formIsValid = true;

    inputs.forEach((input) => {
      if (!this._handleFieldValidation(input)) {
        formIsValid = false;
      }
    });

    return formIsValid;
  }

  /* validates a single input component
    and shows/hides its error */
  private _handleFieldValidation(input: Input | InputEditor): boolean {
    if (!input) {
      console.error("FormValidator: Input is not defined");
    }
    const { name, value } = input.getNameAndValue();
    const errorMessage = validateInputField(name, value);

    /* No error message -> input is valid */
    const inputIsValid = !errorMessage;
    input.showError(errorMessage);

    /* Logging current invalid input fields */
    if (!inputIsValid) console.log(errorMessage);

    return inputIsValid;
  }

  /* collects data from all inputs into a single object */
  private _getFormData(
    inputs: Input[] | InputEditor[],
  ): Record<FieldType, string> {
    const formData: Record<string, string> = {};

    inputs.forEach((input) => {
      const { name, value } = input.getNameAndValue();
      formData[name] = value;
    });

    return formData;
  }

  /* narrows inputs for validation/submission based on submitType */
  private _filterInputsBySubmitType(
    submitType: AuthType | "change-info" | "change-password",
    inputs: Array<Input | InputEditor>,
  ): Array<Input | InputEditor> {
    const PASSWORD_ONLY = new Set(["oldPassword", "newPassword"]);
    const EXCLUDE_FOR_INFO = new Set([
      "password",
      "oldPassword",
      "newPassword",
    ]);

    const getMeta = (inp: Input | InputEditor) => {
      const { name, value } = inp.getNameAndValue();
      return { name: String(name || ""), value: (value ?? "").trim() };
    };

    if (submitType === "change-password") {
      return inputs.filter((inp) => PASSWORD_ONLY.has(getMeta(inp).name));
    }

    if (submitType === "change-info") {
      return inputs.filter((inp) => {
        const { name, value } = getMeta(inp);
        if (!name || EXCLUDE_FOR_INFO.has(name)) return false;
        return value.length > 0;
      });
    }

    /* default (sign-in/sign-up): validate everything */
    return inputs;
  }
}
