import { InputEditor } from "@features/edit-profile/ui/InputEditor.ts";
import { AuthType } from "@pages/auth/model/types.ts";
import { Input } from "../../ui/Input/Input.ts";
import { FieldType } from "../../ui/Input/types.ts";
import { validateInputField } from "./utils.ts";
import { ApiResponse } from "@/shared/api/model/types.ts";

const logMessages = {
  formIsValid: "✅ Form is valid! Here it is 👇",
  formHasErrors: "❌ Hey! Form has errors.. Please correct them. 👆",
};

export default class FormValidator {
  private inputs: Input[] | InputEditor[];
  private onSubmitSuccess?: (
    formData: Record<string, string>,
    submitType: string,
  ) => Promise<ApiResponse>;

  constructor(
    inputs: Input[] | InputEditor[],
    options: {
      onSubmitSuccess?: (
        formData: Record<string, string>,
        submitType: string,
      ) => Promise<ApiResponse>;
    },
  ) {
    this.inputs = inputs;
    this.onSubmitSuccess = options.onSubmitSuccess;
  }

  public onInputBlur = (input: Input): void => {
    this._handleFieldValidation(input);
  };

  public onFormCheck = (
    submitType: AuthType | "change-info" | "change-password",
  ): boolean => {
    const targetInputs = this._filterInputsBySubmitType(
      submitType,
      this.inputs,
    );
    return this._handleFormValidation(targetInputs);
  };

  public onFormSubmit = async (
    event: Event,
    submitType: AuthType | "change-info" | "change-password",
  ): Promise<ApiResponse> => {
    event.preventDefault();

    const targetInputs = this._filterInputsBySubmitType(
      submitType,
      this.inputs,
    );
    const isFormValid = this._handleFormValidation(targetInputs);

    if (isFormValid && this.onSubmitSuccess) {
      const formData = this._getFormData(targetInputs);
      console.log(logMessages.formIsValid, formData);

      return await this.onSubmitSuccess?.(formData, submitType);
    } else {
      console.log(logMessages.formHasErrors);
      event.stopPropagation();

      return { ok: false };
    }
  };

  /* validates all inputs in the form
    and returns if the form is valid */
  private _handleFormValidation(inputs?: Input[] | InputEditor[]): boolean {
    if (!inputs) {
      console.error("FormValidator: Inputs are not defined");
      return false;
    }

    let valid = true;

    inputs.forEach((input) => {
      if (!this._handleFieldValidation(input)) {
        valid = false;
      }
    });

    return valid;
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
