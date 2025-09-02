import { QueryDataType } from "./types";

export function queryStringify(data: QueryDataType): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  const params = Object.entries(data).map(([key, value]) => {
    if (value === null || value === undefined) {
      return '';
    }
    /* TODO: Add recursive handling for nested objects */
    return `${encodeURComponent(key)}=${encodeURComponent(String(value))}`;
  }).filter(p => p !== ''); /* Remove empty parameters */

  return params.length > 0 ? `?${params.join('&')}` : '';
}
