/* Enum is used: eslint is wrongly complaining about unused vars */
export enum Method {
  // eslint-disable-next-line no-unused-vars
  GET = "GET",
  // eslint-disable-next-line no-unused-vars
  POST = "POST",
  // eslint-disable-next-line no-unused-vars
  PUT = "PUT",
  // eslint-disable-next-line no-unused-vars
  DELETE = "DELETE",
}

export enum HttpStatus {
  // eslint-disable-next-line no-unused-vars
  Ok = 200,
  // eslint-disable-next-line no-unused-vars
  Created = 201,
  // eslint-disable-next-line no-unused-vars
  NoContent = 204,
  // eslint-disable-next-line no-unused-vars
  MultipleChoices = 300,
  // eslint-disable-next-line no-unused-vars
  BadRequest = 400,
  // eslint-disable-next-line no-unused-vars
  Unauthorized = 401,
  // eslint-disable-next-line no-unused-vars
  Forbidden = 403,
  // eslint-disable-next-line no-unused-vars
  NotFound = 404,
  // eslint-disable-next-line no-unused-vars
  Conflict = 409,
  // eslint-disable-next-line no-unused-vars
  InternalServerError = 500,
}

export type TQueryData = Record<
  Method,
  string | number | boolean | Record<Method, unknown> | null
>;

export type TOptions = {
  method: Method;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
};

export type TOptionsWithoutMethod = Omit<TOptions, "method">;

/**
 * @unknown — default response type,
 * if no response type is specified during call
 * @eslint no-unused-vars — eslint is wrongly complaining about unused vars */
export type HTTPMethod<Response = unknown> = (
  // eslint-disable-next-line no-unused-vars
  url: string,
  // eslint-disable-next-line no-unused-vars
  options?: TOptionsWithoutMethod,
) => Promise<Response>;
