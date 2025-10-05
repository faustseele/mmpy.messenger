import { ChangePasswordRequest, UserResponse } from "../model/types.ts";
import { BaseAPI } from "../../../shared/api/BaseAPI.ts";
import HTTPTransport from "../../../shared/api/http/HTTPTransport.ts";

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
