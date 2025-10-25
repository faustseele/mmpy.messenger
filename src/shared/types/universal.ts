/** turns any nested structure into an optional-friendly slice. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * DeepPartial but arrays get replaced, not merged
 * ---
 * objs: merged key-by-key
 * arrs: replaced whole, never merged element-by-element
 * primitives & functions: overwritten directly
 * null in the patch: delete that key
 * undefined in the patch: no-op
 * ---
 * */
export type DeepPartialExceptArray<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartialExceptArray<T[K]> }
    : T;

export type Indexed<T = unknown> = {
  [key: string]: T;
};

/* The JSON-valid object */
export type PlainObject<T = unknown> = Record<string, T>;
