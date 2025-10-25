export type ComponentEventBusEvents =
  | "init" // initialized
  | "flow:component-did-mount" // added to DOM
  | "flow:render" // rendered
  | "flow:component-did-update" // updated
  | "flow:component-did-unmount"; // unmounted
