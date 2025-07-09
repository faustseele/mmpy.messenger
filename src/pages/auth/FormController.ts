import { Input } from "../../components/input/Input.ts";
import { InputEditor } from "../../components/input/InputEditor.ts";
import Router from "../../core/Router/Router.ts";
import { TLink } from "../../core/Router/routes.d";
import { validateInputField } from "../../utils/validators.ts";

const logMessages = {
  formIsValid: "✅ Form is valid! Here it is 👇",
  formHasErrors: "❌ Hey! Form has errors.. Please correct them. 👆",
};

export class FormController {
  private inputs: Input[] | InputEditor[];
  private router: Router;

  constructor(router: Router, inputs: Input[] | InputEditor[]) {
    this.inputs = inputs;
    this.router = router;
  }

  public onInputBlur = (event: Event, input: Input): void => {
    this._handleFieldValidation(input);
  };

  public onFormSubmit = (event: Event, link: TLink): void => {
    event.preventDefault();
    // console.log(event);

    const isFormValid = this._handleFormValidation();

    if (isFormValid) {
      const formData = this._getFormData();
      console.log(logMessages.formIsValid, formData);
      this.router.routeTo(link, event);
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
  private _getFormData(): Record<string, string> {
    const formData: Record<string, string> = {};

    this.inputs.forEach((input) => {
      const { name, value } = input.getNameAndValue();
      formData[name] = value;
    });

    return formData;
  }
}
