import { lgg } from "@shared/lib/logs/Logger.ts";
import Store from "@app/providers/store/model/Store.ts";
import UserAPI from "@entities/user/api/UserAPI.ts";
import {
  UpdateUserPassword,
  UserResponse,
} from "@shared/api/model/types.ts";

class UserService {
  public async updateProfile(data: Partial<UserResponse>) {
    try {
      const updatedUser = await UserAPI.updateProfile(data);

      Store.set("api.auth.user", updatedUser);
      lgg.debug("profile update success:", updatedUser);
    } catch (e) {
      lgg.error("profile update fail:", e);
    }
  }

  public async updatePassword(data: UpdateUserPassword) {
    try {
      const updatedUser = await UserAPI.updatePassword(data);

      Store.set("api.auth.user", updatedUser);
      lgg.debug("psw update success:", updatedUser);
    } catch (e) {
      lgg.error("psw update fail:", e);
    }
  }

  public async updateAvatar(data: File) {
    try {
      const updatedUser = await UserAPI.updateAvatar(data);

      Store.set("api.auth.user", updatedUser);
      lgg.debug("avatar update success:", updatedUser);
    } catch (e) {
      lgg.error("avatar update fail:", e);
    }
  }

  public async findByLogin(login: string): Promise<UserResponse | null> {
    try {
      const users = await UserAPI.findUsers({ login });
      const res = users?.[0] ?? null;
      lgg.debug("findByLogin success:", res);
      return res;
    } catch (e) {
      lgg.error("findByLogin fail:", e);
      return null;
    }
  }
}

export default new UserService();
