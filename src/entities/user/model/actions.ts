import { UpdatePasswordData, UpdateProfileData } from "./types.ts";
import UserService from "./UserService.ts";

export const updateProfile = async (data: UpdateProfileData) => {
  await UserService.updateProfile(data);
};

export const updatePassword = async (data: UpdatePasswordData) => {
  await UserService.updatePassword(data);
};

export const updateAvatar = async (avatar: File) => {
  await UserService.updateAvatar(avatar);
};
