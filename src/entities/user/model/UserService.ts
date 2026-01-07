import Store from "@app/providers/store/model/Store.ts";
import UserAPI from "@entities/user/api/UserAPI.ts";
import { UpdateUserPassword, UserResponse } from "@/shared/api/model/api.types";

class UserService {
  public async updateProfile(
    data: Partial<UserResponse>,
  ): Promise<ApiResponse> {
    try {
      const updatedUser = await UserAPI.updateProfile(data);

      Store.set("api.auth.user", updatedUser);
      console.log("profile update success:", updatedUser);
      return { ok: true };
    } catch (e) {
      console.error("profile update fail:", e);
      return { ok: false };
    }
  }

  public async updatePassword(
    data: UpdateUserPassword,
  ): Promise<ApiResponse> {
    try {
      const updatedUser = await UserAPI.updatePassword(data);

      Store.set("api.auth.user", updatedUser);
      console.log("psw update success:", updatedUser);
      return { ok: true };
    } catch (e) {
      console.error("psw update fail:", e);
      return { ok: false };
    }
  }

  public async updateAvatar(data: File) {
    try {
      const updatedUser = await UserAPI.updateAvatar(data);

      Store.set("api.auth.user", updatedUser);
      console.log("avatar update success:", updatedUser);
    } catch (e) {
      console.error("avatar update fail:", e);
    }
  }

  public async findByLogin(login: string): Promise<UserResponse | null> {
    try {
      const users = await UserAPI.findUsers({ login });
      const res = users?.[0] ?? null;
      console.log("findByLogin success:", res);
      return res;
    } catch (e) {
      console.error("findByLogin fail:", e);
      return null;
    }
  }
}

export default new UserService();
