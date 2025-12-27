import HTTPTransport from "@shared/api/http/HTTPTransport.ts";
import { BaseAPI } from "@shared/api/model/BaseAPI.ts";
import {
  SignInRequest,
  SignUpRequest,
  UserResponse,
} from "@shared/api/model/types.ts";

const authAPIInstance = new HTTPTransport("/auth");

class AuthAPI extends BaseAPI {
  public signUp(data: SignUpRequest): Promise<{ id: number }> {
    try {
      return authAPIInstance.post("/signUp", { data }) as Promise<{
        id: number;
      }>;
    } catch (error) {
      throw new Error("AuthAPI: signUp failed", { cause: error });
    }
  }

  public signIn(data: SignInRequest): Promise<string> {
    return authAPIInstance.post("/signIn", { data }) as Promise<string>;
  }

  public requestUser(): Promise<UserResponse> {
    return authAPIInstance.get("/user") as Promise<UserResponse>;
  }

  public async logout(): Promise<boolean> {
    /* def returning is 'null', so using try-catch */
    try {
      (await authAPIInstance.post("/logout")) as Promise<string>;
      return true;
    } catch (_) {
      return false;
    }
  }
}

export default new AuthAPI();
