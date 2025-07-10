import {
  HTTPMethod,
  HttpStatus,
  Method,
  TOptions,
  TOptionsWithoutMethod,
  TQueryData,
} from "./HTTP.d";
import { queryStringify } from "./utils.ts";

/**
 * @class HTTPTransport
 * HTTPTransport class handles HTTP requests.
 * Incapsulates XMLHttpRequest and works with Promise.
 */
export default class HTTPTransport {
  /**
   * Fabric method -> HTTP method
   * @Response -> a type required during the http call
   */
  private createMethod(method: Method): HTTPMethod {
    /* returns HTTP method */
    return <Response>(url: string, options: TOptionsWithoutMethod = {}) => {
      /* In case it's a GET request, adding a query string */
      if (method === Method.GET && options.data) {
        url += queryStringify(options.data as TQueryData);
      }

      return this._request<Response>(url, { ...options, method });
    };
  }

  /* The enum-type is enclosed inside createMethod */
  public get: HTTPMethod = this.createMethod(Method.GET);
  public post: HTTPMethod = this.createMethod(Method.POST);
  public put: HTTPMethod = this.createMethod(Method.PUT);
  public delete: HTTPMethod = this.createMethod(Method.DELETE);

  /**
   * @returns Promise, which is allowed with a typed response
   * or rejects with an error.
   */
  private _request = <TResponse>(
    url: string,
    options: TOptions,
  ): Promise<TResponse> => {
    const { method, data, headers = {}, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      /* JSON – preferred response type */
      xhr.responseType = "json";

      /* Handling headers */
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      /* If no Formdata, set Content-Type header */
      if (!(data instanceof FormData) && data) {
        if (!headers["Content-Type"]) {
          xhr.setRequestHeader("Content-Type", "application/json");
        }
      }

      /* Catching the response */
      xhr.onload = () => {
        if (xhr.status >= HttpStatus.Ok && xhr.status < HttpStatus.MultipleChoices) {
          /* xhr should be a JSON object here */
          resolve(xhr.response as TResponse);
        } else {
          reject({
            status: xhr.status,
            reason: xhr.response?.reason || xhr.statusText,
            response: xhr.response,
          });
        }
      };

      xhr.onabort = () => reject({ reason: "Request aborted" });
      xhr.onerror = () => reject({ reason: "Network error" });
      xhr.ontimeout = () => reject({ reason: "Request timed out" });

      xhr.timeout = options.timeout || 5000;
      xhr.withCredentials = withCredentials;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        const body = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(body);
      }
    });
  };
}
