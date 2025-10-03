import EventBus from "../../EventBus/EventBus.ts";
import { BaseProps } from "../model/base.types.ts";
import { ComponentAttributes, ComponentConfigs } from "../model/types.ts";

/* Implementing Reactivity through Proxy. Emits 'CDU' */
export function proxifyConfigs<C extends ComponentConfigs>(
  configs: C,
  eventBus: EventBus<string>,
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
    deleteProperty: (target: C, prop: keyof ComponentConfigs) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      delete (target as Record<PropertyKey, unknown>)[prop];
      eventBus.emit("flow:component-did-update");

      return true;
    },
  });

  return proxifiedConfigs;
}

/* Implementing Reactivity through Proxy. Emits 'CDU' */
export function proxifyAttributes<A extends ComponentAttributes>(
  attributes: A,
  eventBus: EventBus<string>,
): BaseProps["attributes"] {
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
    deleteProperty: (target: A, prop: keyof ComponentAttributes) => {
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
