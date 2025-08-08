import EventBus from "../../services/events/EventBus.ts";
import { ChildrenPropsMap, IChildren, IChildrenData } from "./Children.d";
import { IComponentAttributes, IComponentConfigs } from "./Component.d";

/* Implementing Reactivity through Proxy. Emits 'CDU' */
export function proxifyConfigs<C extends IComponentConfigs>(
  configs: C,
  eventBus: EventBus,
): C {
  if (typeof configs !== "object" || !configs) {
    throw new Error(`Configs must be an object, got ${typeof configs}`);
  }

  const proxifiedConfigs = new Proxy(configs, {
    set: (target: C, prop: PropertyKey, value: C[keyof C]): boolean => {
      if (typeof prop !== "string") {
        return false;
      }

      target[prop as keyof C] = value;

      eventBus.emit("flow:component-did-update");
      return true;
    },
    deleteProperty: (target: C, prop: keyof IComponentConfigs) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      delete (target as Record<PropertyKey, unknown>)[prop];
      eventBus.emit("flow:component-did-update");

      return true;
    },
  });

  return proxifiedConfigs;
}

/* Implementing Reactivity through Proxy. Emits 'CDU' */
export function proxifyAttributes<A extends IComponentAttributes>(
  attributes: A,
  eventBus: EventBus,
): A {
  if (typeof attributes !== "object" || !attributes) {
    throw new Error(`Attributes must be an object, got ${typeof attributes}`);
  }

  const proxifiedAttributes = new Proxy(attributes, {
    set: (target: A, prop: PropertyKey, value: A[keyof A]): boolean => {
      if (typeof prop !== "string") {
        return false;
      }

      target[prop as keyof A] = value;

      eventBus.emit("flow:component-did-update");
      return true;
    },
    deleteProperty: (target: A, prop: keyof IComponentAttributes) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      delete (target as Record<PropertyKey, unknown>)[prop];
      eventBus.emit("flow:component-did-update");

      return true;
    },
  });

  return proxifiedAttributes;
}

/**
 * Todo: implement proxifed event
 */

export function getChildSlotKey(
  data: IChildrenData<ChildrenPropsMap>,
  key: keyof IChildrenData<ChildrenPropsMap>,
): string {
  return data[key].type === "list"
    ? data[key].slotKey
    : data[key].data.configs.slotKey;
}

export function getChildrenDataFromMap<
  Map extends ChildrenPropsMap = ChildrenPropsMap,
>(data: IChildrenData<Map>, key: keyof IChildrenData<Map>): Map[keyof Map][] {
  if (data[key].type === "single") {
    console.error("getChildrenDataFromMap: Single children are not supported");
    return {} as Map[keyof Map];
  }
  return data[key].dataList;
}

export function getChildDataFromMap<
  Map extends ChildrenPropsMap = ChildrenPropsMap,
>(data: IChildrenData<Map>, key: keyof IChildrenData<Map>): Map[keyof Map] {
  if (data[key].type === "list") {
    console.error("getChildDataFromMap: List children are not supported");
    return {} as Map[keyof Map];
  }
  return data[key].data;
}

export function getChildrenFromMap<
  Map extends ChildrenPropsMap = ChildrenPropsMap,
>(map: IChildren<Map>, key: keyof IChildren<Map>): Map[keyof Map][] {
  if (map[key].type === "single") {
    console.error("getChildrenFromMap: Single children are not supported");
    return {} as Map[keyof Map][];
  }
  return map[key].children;
}

export function getChildFromMap<
  Map extends ChildrenPropsMap = ChildrenPropsMap,
>(map: IChildren<Map>, key: keyof IChildren<Map>): Map[keyof Map] {
  if (map[key].type === "list") {
    console.error("getChildFromMap: List children are not supported");
    return {} as Map[keyof Map];
  }
  return map[key].child;
}
