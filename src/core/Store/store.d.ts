/* eslint-disable no-unused-vars */
/* Eslint issue: '...params' are actually used, see 'emit' method */
export type StoreEventBusEvents = "updated";

type Indexed<T = unknown> = {
  /* Eslint doesn't get that key is used */
  // eslint-disable-next-line no-unused-vars
  [key in string]: T;
};

type PlainObject<T = unknown> = {
  // eslint-disable-next-line no-unused-vars
  [k in string]: T;
};
