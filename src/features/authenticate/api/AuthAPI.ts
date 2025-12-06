import { BaseAPI } from "@shared/api/model/BaseAPI.ts";
import HTTPTransport from "@shared/api/http/HTTPTransport.ts";
import { SignUpRequest, SignInRequest, UserResponse } from "@shared/api/model/types.ts";

const authAPIInstance = new HTTPTransport("/auth");

class AuthAPI extends BaseAPI {
  public signUp(data: SignUpRequest): Promise<{ id: number }> {
    return authAPIInstance.post("/signUp", { data }) as Promise<{ id: number }>;
  }

  public signIn(data: SignInRequest): Promise<string> {
    return authAPIInstance.post("/signIn", { data }) as Promise<string>;
  }

  public requestUser(): Promise<UserResponse> {
    return authAPIInstance.get("/user") as Promise<UserResponse>;
  }

  public async logout(): Promise<string> {
    const res = (await authAPIInstance.post("/logout")) as Promise<string>;
    console.log(res);
    return res;
  }
}

export default new AuthAPI();
