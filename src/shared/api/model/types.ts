export interface ApiResponse {
  ok: boolean;
  err?: ApiError;
}

export interface ApiError {
  status: number;
  reason: string;
  response: string;
}
