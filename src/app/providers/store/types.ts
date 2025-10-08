import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import { AppState } from "./Store.ts";

export type StoreEventBusEvents = "updated";

export type Indexed<T = unknown> = {
  [key: string]: T;
};

/* The JSON-valid object */
export type PlainObject<T = unknown> = Record<string, T>

export type MapStateToProps<StateSlice extends AppState> = (
  state: AppState,
) => StateSlice;

export type PropsWithState<
  StateSlice extends AppState,
  TProps extends BaseProps,
> = ComponentProps<TProps> & {
  state: StateSlice;
};
