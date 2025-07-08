import { Input } from "../../components/input/Input.ts";
import Router from "../../core/Router/Router.ts";
import { validateInputField } from "../../utils/validators.ts";

const logMessages = {
  formIsValid: "✅ Form is valid! Here it is~",
  formHasErrors: "❌ Hey! Form has errors.. Please correct them. 👆",
};

export class FormController {
  private inputs: Input[];
  private router: Router;

  constructor(router: Router, inputs: Input[]) {
    this.inputs = inputs;
    this.router = router;
  }

  public onSubmit = (event: Event): void => {
    event.preventDefault();

    /* Evading the non-KeyEvents*/
    // if (!(event instanceof KeyboardEvent) || !(event instanceof SubmitEvent)) return;

    /* Evading the non-Enter keypress */
    // if (event instanceof KeyboardEvent && event.key !== "Enter") return;

    this._handleSubmit(event);
  };

  private _handleSubmit = (event: Event): void => {
    // console.log(event);
    const isFormValid = this._handleFormValidation();

    if (isFormValid) {
      const formData = this._getFormData();
      console.log(logMessages.formIsValid, formData);
      this.router.routeTo("/chats", event);
    } else {
      console.log(logMessages.formHasErrors);
      event.stopPropagation()
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
  private _handleFieldValidation(input: Input): boolean {
    const { name, value } = input.getNameAndValue();
    const errorMessage = validateInputField(name, value);

    // input.setError(errorMessage);
    /* No error message -> input is valid */
    const inputIsValid = !errorMessage;

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
