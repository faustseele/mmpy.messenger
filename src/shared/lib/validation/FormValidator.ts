import { Input } from "../../components/input/Input.ts";
import { InputEditor } from "../../components/input/InputEditor.ts";
import AuthService from "../../controllers/AuthService.ts";
import UserService from "../../../features/edit-profile/model/UserService.ts";
import Router from "../../app/providers/router/Router.ts";
import { RouteLink } from "../../app/providers/router/types.ts";
import { AuthType } from "../../../pages/auth/model/types.ts";
import { FieldType } from "../../utils/input.d";
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
    link: RouteLink,
    submitType: AuthType | "change-info" | "change-password",
  ): Promise<void> => {
    event.preventDefault();

    const isFormValid = this._handleFormValidation();

    if (isFormValid) {
      const formData = this._getFormData();
      console.log(logMessages.formIsValid, formData);

      if (submitType === "sign-in") {
        await AuthService.signin({
          login: formData.login,
          password: formData.password,
        });
        return;
      } else if (submitType === "sign-up") {
        await AuthService.signup({
          first_name: formData.name,
          second_name: formData.surname,
          login: formData.login,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      } else if (submitType === "change-info") {
        await UserService.updateProfile({
          first_name: formData.name,
          second_name: formData.surname,
          login: formData.login,
          email: formData.email,
          phone: formData.phone,
        });
      } else if (submitType === "change-password") {
        console.warn("Not implemented");
      }
      Router.go(link);
      return;
    } else {
      console.log(logMessages.formHasErrors);
      event.stopPropagation();
    }
  };

  /* Validates all inputs in the form
    and returns if the form is valid. */
  private _handleFormValidation(): boolean {
    let formIsValid = true;

    this.inputs.forEach((input) => {
      if (!this._handleFieldValidation(input)) {
        formIsValid = false;
      }
    });

    return formIsValid;
  }

  /* Validates a single input component
    and shows/hides its error. */
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

  /* Collects data from all inputs into a single object. */
  private _getFormData(): Record<FieldType, string> {
    const formData: Record<string, string> = {};

    this.inputs.forEach((input) => {
      const { name, value } = input.getNameAndValue();
      formData[name] = value;
    });

    return formData;
  }
}
