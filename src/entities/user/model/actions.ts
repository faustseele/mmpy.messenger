import { UpdatePasswordData, UpdateProfileData } from "./types.ts";
import UserService from "./UserService.ts";

export const handleUpdateProfile = async (data: UpdateProfileData) => {
  await UserService.updateProfile(data);
};

export const handleUpdatePassword = async (data: UpdatePasswordData) => {
  await UserService.updatePassword(data);
};

export const handleUpdateAvatar = async (avatar: File) => {
  await UserService.updateAvatar(avatar);
};
