import HTTPTransport from "../../../core/HTTP/HTTPTransport.ts";
import { ChangePasswordRequest, UserResponse } from "../api.d";
import { BaseAPI } from "../BaseAPI.ts";

const userAPIInstance = new HTTPTransport("/user");

class UserAPI extends BaseAPI {
  public updateProfile(data: Partial<UserResponse>): Promise<UserResponse> {
    return userAPIInstance.put("/profile", { data }) as Promise<UserResponse>;
  }

  public updatePassword(data: ChangePasswordRequest): Promise<string> {
    return userAPIInstance.put("/password", { data }) as Promise<string>;
  }
}

export default new UserAPI();
