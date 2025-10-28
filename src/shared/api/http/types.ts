export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  MultipleChoices = 300,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export type QueryDataType = Record<
  HttpMethod,
  string | number | boolean | Record<HttpMethod, unknown> | null
>;

export interface HttpOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
}

export type HttpOptionsNoMethod = Omit<HttpOptions, "method">;

/**
 * @unknown — default response type,
 * if no response type is specified during call
 * @eslint no-unused-vars — eslint is wrongly complaining about unused vars */
export type HttpMethodType<Response = unknown> = (
  url: string,
  // eslint-disable-next-line no-unused-vars
  options?: HttpOptionsNoMethod,
) => Promise<Response>;
