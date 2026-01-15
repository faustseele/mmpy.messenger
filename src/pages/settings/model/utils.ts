import { ApiResponse } from "@/shared/api/model/types.ts";
import { globalBus } from "@/shared/lib/EventBus/EventBus.ts";
import {
  handleUpdatePassword,
  handleUpdateProfile,
} from "@entities/user/model/actions.ts";
import { SettingsType } from "./types.ts";

export const onGoodForm = (
  submitType: SettingsType,
): ((
  formData: Record<string, string>,
) => Promise<ApiResponse<string | boolean>>) => {
  if (submitType === "change-password") {
    return async (formData: Record<string, string>) => {
      const res = await handleUpdatePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      return res;
    };
  }

  if (submitType === "change-info") {
    return async (formData: Record<string, string>) => {
      const res = await handleUpdateProfile({
        first_name: formData.name,
        second_name: formData.surname,
        display_name: formData.display_name,
        login: formData.login,
        email: formData.email,
        phone: formData.phone,
      });

      return res;
    };
  }

  return async () => {
    console.error("SettingsPage: Unknown submitType", submitType);
    return {
      ok: false,
      err: {
        status: 400,
        reason: "Unknown submitType",
        response: "Non-API response",
      },
    };
  };
};

export const onBadForm = (submitType: SettingsType): (() => void) => {
  if (submitType === "change-info") {
    return () => {
      globalBus.emit("show-toast", {
        message: "Please fill all the fields.",
        type: "error",
      });
    };
  } else {
    return () => {
      globalBus.emit("show-toast", {
        message:
          "Either the old is incorrect or the new password is not valid.",
        type: "error",
      });
    };
  }
};
