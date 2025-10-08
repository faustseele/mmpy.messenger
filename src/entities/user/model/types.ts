import { UserResponse } from "../../../features/authenticate/model/types.ts";

/* From PUT /user/profile */
export type UserUpdateRequest = Partial<Omit<UserResponse, "id" | "avatar">>;

/* From PUT /user/password */
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/* From POST /user/search */
export interface FindUserRequest {
  login: string;
}
/* Search response is an array of UserResponse: UserResponse[] */
