import UserAPI from "../framework/API/User/UserAPI.ts";
import { ChangePasswordRequest, UserResponse } from "../framework/API/api.d";

class UserController {
  public async updateProfile(data: Partial<UserResponse>) {
    try {
      const updatedUser = await UserAPI.updateProfile(data);

      // IMPORTANT: When we implement the global Store,
      // we will update the state here, e.g.:
      // store.set('user', updatedUser);

      console.log("Profile updated successfully:", updatedUser);
    } catch (e) {
      console.error("Profile update failed:", e);
    }
  }

  public async updatePassword(data: ChangePasswordRequest) {
    try {
      await UserAPI.updatePassword(data);
      console.log("Password updated successfully");
    } catch (e) {
      console.error("Password update failed:", e);
    }
  }
}

export default new UserController();
