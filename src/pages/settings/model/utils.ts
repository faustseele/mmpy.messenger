import { UserResponse } from "@/shared/api/model/api.types.ts";
import { ApiResponse } from "@/shared/api/model/types.ts";
import {
  handleUpdatePassword,
  handleUpdateProfile,
} from "@entities/user/model/actions.ts";

export const onFormSubmitSuccess = async (
  formData: Record<string, string>,
  submitType: string,
): Promise<ApiResponse<UserResponse | string>> => {
  if (submitType === "change-password") {
    const res = await handleUpdatePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });

    return res;
  } else if (submitType === "change-info") {
    const res = await handleUpdateProfile({
      first_name: formData.name,
      second_name: formData.surname,
      display_name: formData.display_name,
      login: formData.login,
      email: formData.email,
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
