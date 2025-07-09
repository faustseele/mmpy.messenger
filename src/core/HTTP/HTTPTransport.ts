/* Enum is used: eslint is wrongly complaining about unused vars */;
enum Method {
  // eslint-disable-next-line no-unused-vars
  GET = 'GET',
  // eslint-disable-next-line no-unused-vars
  POST = 'POST',
  // eslint-disable-next-line no-unused-vars
  PUT = 'PUT',
  // eslint-disable-next-line no-unused-vars
  DELETE = 'DELETE',
}

type TQueryData = Record<Method, string | number | boolean | Record<Method, unknown> | null>;

type TOptions = {
  method: Method;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
};

type TOptionsWithoutMethod = Omit<TOptions, 'method'>;


function queryStringify(data: TQueryData): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  const params = Object.entries(data).map(([key, value]) => {
    if (value === null || value === undefined) {
      return '';
    }
    /* TODO: Add recursive handling for nested objects */
    return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
  }).filter(p => p !== ''); /* Remove empty parameters */

  return params.length > 0 ? `?${params.join('&')}` : '';
}


/**
 * @class HTTPTransport
 * HTTPTransport class handles HTTP requests.
 * Incapsulates XMLHttpRequest and works with Promise.
 */
export default class HTTPTransport {

  public get = (url: string, options: TOptionsWithoutMethod = {}): Promise<unknown> => {
    const urlWithQuery = options.data ? `${url}${queryStringify(options.data as TQueryData)}` : url;
    return this._request(urlWithQuery, { ...options, method: Method.GET }, options.timeout);
  };

  public post = (url:string, options: TOptionsWithoutMethod = {}): Promise<unknown> => {
    return this._request(url, { ...options, method: Method.POST }, options.timeout);
  };

  public put = (url: string, options: TOptionsWithoutMethod = {}): Promise<unknown> => {
    return this._request(url, { ...options, method: Method.PUT }, options.timeout);
  };

  public delete = (url: string, options: TOptionsWithoutMethod = {}): Promise<unknown> => {
    return this._request(url, { ...options, method: Method.DELETE }, options.timeout);
  };

  /**
   * @returns Promise, which is allowed with a typed response or rejects with an error.
   */
  private _request = <TResponse>(
    url: string,
    options: TOptions & { method: Method },
    timeout = 5000,
  ): Promise<TResponse> => {
    const { method, data, headers = {}, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      
      /* JSON – preferred response type */
      xhr.responseType = 'json'; 

      /* Handling headers */
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
      
      /* If no Formdata, set Content-Type header */
      if (!(data instanceof FormData) && data) {
         if (!headers['Content-Type']) {
            xhr.setRequestHeader('Content-Type', 'application/json');
         }
      }

      /* Catching the response */
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
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
      
      xhr.onabort = () => reject({ reason: 'Request aborted' });
      xhr.onerror = () => reject({ reason: 'Network error' });
      xhr.ontimeout = () => reject({ reason: 'Request timed out' });

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        const body = (data instanceof FormData) ? data : JSON.stringify(data);
        xhr.send(body);
      }
    });
  };
}


