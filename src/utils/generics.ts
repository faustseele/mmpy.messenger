/* any is used here as a placholder for type extraction */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Component from "../framework/Component/Component.ts";

/**
 * Extracts types for each property in IComponentData for Conrete Components
 */
export type ExtractComponentDataTypes<T extends Component<any, any, any, any>> =
  T extends Component<infer C, infer A, infer E, infer CD> ? [C, A, E, CD, T] : never;
