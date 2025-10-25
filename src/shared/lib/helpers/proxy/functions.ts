import { BaseConfigs, BaseProps } from "../../Component/model/base.types.ts";
import { ComponentParams } from "../../Component/model/types.ts";
import EventBus from "../../EventBus/EventBus.ts";

/* implements reactivity through Proxy. Emits 'CDU' */
export function proxifyParams<P extends BaseProps>(
  params: ComponentParams<P>,
  bus: EventBus<string>,
): ComponentParams<P> {
  if (typeof params !== "object" || !params) {
    throw new Error(`ComponentProps must be an object, got ${typeof params}`);
  }

  const {
    configs,
    attributes = {},
    on = {},
    children = { nodes: {}, edges: {} },
  } = params;

  const proxifiedConfigs = new Proxy(configs, {
    set: (
      target: typeof configs,
      prop: PropertyKey,
      value: (typeof configs)[keyof typeof configs],
    ): boolean => {
      if (typeof prop !== "string") return false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[prop] = value;

      bus.emit("flow:component-did-update");
      return true;
    },
    deleteProperty: (target: typeof configs, prop: keyof BaseConfigs) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      delete (target as Record<PropertyKey, unknown>)[prop];
      bus.emit("flow:component-did-update");

      return true;
    },
  });

  const proxifiedAttributes = new Proxy(attributes, {
    set: (
      target: typeof attributes,
      prop: PropertyKey,
      value: (typeof attributes)[keyof typeof attributes],
    ): boolean => {
      if (typeof prop !== "string") return false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[prop] = value;

      bus.emit("flow:component-did-update");
      return true;
    },
    deleteProperty: (target: typeof attributes, prop: keyof BaseProps) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      delete (target as Record<PropertyKey, unknown>)[prop];
      bus.emit("flow:component-did-update");

      return true;
    },
  });

  const proxifiedOn = new Proxy(on, {
    set: (
      target: typeof on,
      prop: PropertyKey,
      value: (typeof on)[keyof typeof on],
    ): boolean => {
      if (typeof prop !== "string") return false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[prop] = value;

      bus.emit("flow:component-did-update");
      return true;
    },
    deleteProperty: (target: typeof on, prop: keyof BaseProps) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      delete (target as Record<PropertyKey, unknown>)[prop];
      bus.emit("flow:component-did-update");

      return true;
    },
  });

  const proxifiedChildren = new Proxy(children, {
    set: (
      target: typeof children,
      prop: PropertyKey,
      value: (typeof children)[keyof typeof children],
    ): boolean => {
      if (typeof prop !== "string") return false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[prop] = value;

      bus.emit("flow:component-did-update");
      return true;
    },
    deleteProperty: (target: typeof children, prop: keyof BaseProps) => {
      if (typeof prop === "string" && prop.startsWith("_")) return false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (target as any)[prop];
      bus.emit("flow:component-did-update");

      return true;
    },
  });

  return {
    configs: proxifiedConfigs,
    attributes: proxifiedAttributes,
    on: proxifiedOn,
    children: proxifiedChildren,
  };
}
