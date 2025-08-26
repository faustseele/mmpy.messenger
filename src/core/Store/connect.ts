import Component, {
  ComponentParams,
} from "../../framework/Component/Component.ts";
import { BaseProps } from "../../framework/Component/component.d";
import Store, { AppState } from "./Store.ts";
import { isEqual } from "./utils.ts";

type MapStateToProps = (state: AppState) => Partial<AppState>;

export function connect(mapStateToProps: MapStateToProps) {
  return function <TProps extends BaseProps>(
    ComponentClass: typeof Component<TProps>,
  ) {
    return class extends ComponentClass {
      constructor(params: ComponentParams<TProps>) {
        let state = mapStateToProps(Store.getState());

        params.data.storeProps = state;

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
