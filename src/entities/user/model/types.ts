import { UserResponse } from "../../../features/authenticate/model/types.ts";

/* PUT /user/profile */
export type UpdateUserProfile = Partial<Omit<UserResponse, "id" | "avatar">>;

/* PUT /user/password */
export interface UpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

/* PUT /user/profile/avatar */
export interface UpdateUserAvatar {
  avatar: File;
}

/* From POST /user/search */
export interface FindUserRequest {
  login: string;
}
/* Search response is an array of UserResponse: UserResponse[] */
