import { SignInRequest, SignUpRequest, UserResponse } from "../../../../entities/user/model/types.ts";
import { BaseAPI } from "../../../../shared/api/BaseAPI.ts";
import HTTPTransport from "../../../../shared/api/http/HTTPTransport.ts";

const authAPIInstance = new HTTPTransport("/auth");

class AuthAPI extends BaseAPI {
  public signup(data: SignUpRequest): Promise<{ id: number }> {
    return authAPIInstance.post("/signup", { data }) as Promise<{ id: number }>;
  }

  public signin(data: SignInRequest): Promise<string> {
    return authAPIInstance.post("/signin", { data }) as Promise<string>;
  }

  public request(): Promise<UserResponse> {
    return authAPIInstance.get("/user") as Promise<UserResponse>;
  }

  public async logout(): Promise<string> {
    const res = await authAPIInstance.post("/logout") as Promise<string>;
    console.log(res); 
    return res;
  }
}

export default new AuthAPI();
