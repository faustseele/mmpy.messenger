import {
  ChildrenInstances,
  ChildrenMap,
  ChildrenSchema,
} from "../../Component/model/children.types.ts";

export function buildChildren<
  TMap extends ChildrenMap,
  TSchema extends ChildrenSchema<TMap>,
>(childrenSchema: TSchema): ChildrenInstances<TMap, TSchema> {
  if (!childrenSchema) {
    throw new Error("childrenSchema is not defined");
  }

  const result = {
    singles: {},
    lists: {},
  } as ChildrenInstances<TMap, TSchema>;

  function buildSingles(singles: TSchema["singles"]): void {
    for (const key of Object.keys(singles)) {
      const { init, factory } = singles[key];
      const child = factory(init);
      result.singles[key as keyof TSchema["singles"]] = child;
    }
  }

  function buildLists(lists: TSchema["lists"]): void {
    for (const key of Object.keys(lists)) {
      const { init, factory } = lists[key];
      const childList = init.map((childInit) => factory(childInit));
      result.lists[key as keyof TSchema["lists"]] = childList;
    }
  }

  if (Object.keys(childrenSchema.singles ?? {}).length) {
    buildSingles(childrenSchema.singles);
  }

  if (Object.keys(childrenSchema.lists ?? {}).length) {
    buildLists(childrenSchema.lists);
  }

  return result;
}
