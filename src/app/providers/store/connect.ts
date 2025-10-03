import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import Component from "../../../shared/lib/Component/model/Component.ts";
import { ComponentProps } from "../../../shared/lib/Component/model/types.ts";
import Store, { AppState } from "./Store.ts";
import { isEqual } from "./utils.ts";

type MapStateToProps = (state: AppState) => Partial<AppState>;

export function connect(mapStateToProps: MapStateToProps) {
  return function <TProps extends BaseProps>(
    ComponentClass: typeof Component<TProps>,
  ) {
    return class extends ComponentClass {
      constructor(params: ComponentProps<TProps>) {
        let state = mapStateToProps(Store.getState());

        params.data = state;

        super(params);

        Store.on("updated", () => {
          const newState = mapStateToProps(Store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({
              ...params.data,
              storeProps: newState,
            });
          }

          state = newState;
        });
      }

      public getSourceMarkup(): string {
        return super.getSourceMarkup();
      }
    };
  };
}
