import {
  handleSignIn,
  handleSignUp,
} from "@features/authenticate/model/actions.ts";

export const onSubmitSuccess = async (
  formData: Record<string, string>,
  submitType: string,
): Promise<{ ok: boolean }> => {
  if (submitType === "sign-in") {
    return await handleSignIn({
      login: formData.login,
      password: formData.password,
    });
  } else if (submitType === "sign-up") {
    return await handleSignUp({
      first_name: formData.name,
      second_name: formData.surname,
      login: formData.login,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });
  }

  return { ok: false };
};
