import { ApiResponse } from "@/shared/api/model/types.ts";
import {
  handleSignIn,
  handleSignUp,
} from "@features/authenticate/model/actions.ts";

export const onSubmitSuccess = async (
  formData: Record<string, string>,
  submitType: string,
): Promise<ApiResponse> => {
  if (submitType === "sign-in") {
    const res = await handleSignIn({
      login: formData.login,
      password: formData.password,
    });

    return res;
  } else if (submitType === "sign-up") {
    const res = await handleSignUp({
      first_name: formData.name,
      second_name: formData.surname,
      login: formData.login,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });

    return res;
  }

  return {
    ok: false,
    err: {
      status: 400,
      reason: "Unknown submitType",
      response: "Non-API response",
    },
  };
};
