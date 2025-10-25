import { DeepPartial } from "../../../types/universal.ts";

export function shallowEqual<T>(a: T, b: T): boolean {
  /* fast path: same reference or both NaN */
  if (Object.is(a, b)) return true;

  /* either is null/undefined or not an object, they can't be shallow-equal */
  if (
    typeof a !== "object" || a === null ||
    typeof b !== "object" || b === null
  ) {
    return false;
  }

  /* arrays: same length and each element is Object.is-equal */
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!Object.is(a[i], b[i])) return false;
    }
    return true;
  }

  /* obj: compare own keys (including symbols) and values shallowly */
  const keysA = Reflect.ownKeys(a as object);
  const keysB = Reflect.ownKeys(b as object);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    /* Has own key? */
    if (!Reflect.has(b as object, key)) return false;
    /* values shallow-compare */
    if (!Object.is((a as never)[key], (b as never)[key])) return false;
  }

  return true;
}

/* Generic, dependency-free deep merge tailored for configs/attributes. */
export function deepMerge<T extends object>(
  target: T,
  source?: DeepPartial<T>,
): T {
  if (!source) {
    return target;
  }

  const result: T = { ...target };

  Object.entries(source).forEach(([key, value]) => {
    const k = key as keyof T;

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof result[k] === "object" &&
      result[k] !== null &&
      !Array.isArray(result[k])
    ) {
      result[k] = deepMerge(result[k] as object, value as DeepPartial<object>) as T[typeof k];
      return;
    }

    result[k] = value as T[typeof k];
  });

  return result;
}
