/* eslint-disable no-unused-vars */
/* Eslint issue: '...params' are actually used, see 'emit' method */
export type StoreEventBusEvents = "updated";

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type PlainObject<T = unknown> = {
  [k in string]: T;
};
