import { updatePassword, updateProfile } from "@/entities/user/model/actions.ts";

export const onSubmitSuccess = async (formData: Record<string, string>, submitType: string) => {
  if (submitType === "change-password") {
    await updatePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
  } else if (submitType === "change-info") {
    await updateProfile({
      first_name: formData.name,
      second_name: formData.surname,
      display_name: formData.display_name,
      login: formData.login,
      email: formData.email,
      phone: formData.phone,
    });
  }
};
