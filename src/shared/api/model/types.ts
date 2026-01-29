export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  err?: ApiError;
}

export interface ApiError {
  status: number;
  reason: string;
  response: string;
}
