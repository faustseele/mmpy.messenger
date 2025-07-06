import type { TEvent, IMappedEvents, EventCallback } from "./EventBus.d";

/* Eslint issue: '...params' are actually used, see 'emit' method */
// eslint-disable-next-line no-unused-vars

export default class EventBus {
  private listeners: IMappedEvents = {};

  // Subscribe to the event
  public on(event: TEvent, callback: EventCallback): void {
    if (!this.listeners[event]?.length) this.listeners[event] = [];

    this.listeners[event].push(callback);
  }

  // Unsubscribe from the event
  public off(event: TEvent, callback: EventCallback): void {
    if (!this.listeners[event]?.length) this._throwNotFoundError(event, "off");

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback,
    );
  }

  /** Emit event
    @param ...args: gathering multiple params for callback
  */
  public emit(event: TEvent, ...args: unknown[]): void {
    if (!this.listeners[event]?.length) this._throwNotFoundError(event, "emit");

    this.listeners[event]?.forEach((listener) => listener(args));
  }

  private _throwNotFoundError(event: TEvent, action: "off" | "emit"): Error {
    return new Error(`Not found event called '${event}' in '${action}' action`);
  }
}
