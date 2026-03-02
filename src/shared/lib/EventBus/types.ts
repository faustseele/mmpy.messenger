import { ComponentEvents } from "../Component/model/event.types.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventCallback = (...args: any[]) => void;

export type TEvents = ComponentEvents | "toast"
| "rerender"
