/* From POST /auth/signUp */
export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

/* From POST /auth/signUp */
export interface SignUpResponse {
  id: number;
}

/* From POST /auth/signIn */
export interface SignInRequest {
  login: string;
  password: string;
}

/* From GET /auth/user */
export interface UserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}
