/* eslint-disable no-unused-vars */
/* Eslint doesn't like abstract classes */
export abstract class BaseAPI {
  public create?(data: unknown): Promise<unknown>;
  public request?(identifier?: string | number): Promise<unknown>;
  public update?(identifier: string | number, data: unknown): Promise<unknown>;
  public delete?(identifier: string | number): Promise<unknown>;
}
