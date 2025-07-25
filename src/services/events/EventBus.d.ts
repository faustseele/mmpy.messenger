/* eslint-disable no-unused-vars */
/* Eslint issue: '...params' are actually used, see 'emit' method */
export type TEvent =
  | "init" // Component initialized
  | "flow:component-did-mount" // Component added to DOM
  | "flow:render" // Component rendered
  | "flow:component-did-update" // Component updated
  | "flow:component-did-unmount"; // Component unmounted

export type IMappedEvents = {
  [K in TEvent]?: EventCallback[];
};

export type EventCallback = (params: unknown[]) => void;
