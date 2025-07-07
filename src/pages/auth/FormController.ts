import { Input } from "../../components/input/Input.ts";
import { routeTo } from "../../utils/router.ts";
import { validateInputField } from "../../utils/validators.ts";

const logMessages = {
  formIsValid: "✅ Form is valid! Here it is~",
  formHasErrors: "❌ Hey! Form has errors.. Please correct them. 👆",
};

export class FormController {
  private inputs: Input[];

  constructor(inputs: Input[]) {
    this.inputs = inputs;
  }

  /* Handles the entire form submission process. */
  public handleSubmit = (event: Event): void => {
    event.preventDefault();

    const isFormValid = this._handleFormValidation();

    if (isFormValid) {
      const formData = this._getFormData();
      console.log(logMessages.formIsValid, formData);
      routeTo("/chats", event);
    } else {
      console.log(logMessages.formHasErrors);
    }
  };

  /* Validates a single input component
    and shows/hides its error. */
  private _handleFieldValidation(input: Input): boolean {
    const { name, value } = input.getNameAndValue();
    const errorMessage = validateInputField(name, value);

    // input.setError(errorMessage);
    console.log(errorMessage);
    const isInputValid = !errorMessage;

    return isInputValid;
  }

  /* Validates all inputs in the form
    and returns if the form is valid. */
  private _handleFormValidation(): boolean {
    let isFormValid = true;

    this.inputs.forEach((input) => {
      if (!this._handleFieldValidation(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  /* Collects data from all inputs into a single object. */
  private _getFormData(): Record<string, string> {
    const formData: Record<string, string> = {};

    this.inputs.forEach((input) => {
      const { name, value } = input.getNameAndValue();
      formData[name] = value;
    });

    return formData;
  }
}
