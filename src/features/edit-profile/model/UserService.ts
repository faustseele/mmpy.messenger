import Store from "../../../app/providers/store/Store.ts";
import UserAPI from "../../../entities/user/api/UserAPI.ts";
import {
  UpdateUserPassword,
  UserResponse,
} from "../../../shared/api/model/types.ts";

class UserService {
  public async updateProfile(data: Partial<UserResponse>) {
    try {
      const updatedUser = await UserAPI.updateProfile(data);

      Store.set("api.auth.user", updatedUser);
      console.log("Profile updated successfully:", updatedUser);
    } catch (e) {
      console.error("Profile update failed:", e);
    }
  }

  public async updatePassword(data: UpdateUserPassword) {
    try {
      const updatedUser = await UserAPI.updatePassword(data);

      Store.set("api.auth.user", updatedUser);
      console.log("Password updated successfully");
    } catch (e) {
      console.error("Password update failed:", e);
    }
  }

  public async updateAvatar(data: File) {
    try {
      const updatedUser = await UserAPI.updateAvatar(data);

      Store.set("api.auth.user", updatedUser);
      console.log("Avatar updated successfully:", updatedUser);
    } catch (e) {
      console.error("Avatar update failed:", e);
    }
  }

  
}

export default new UserService();
