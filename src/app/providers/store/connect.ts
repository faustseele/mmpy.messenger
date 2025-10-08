import { Page } from "../../../pages/page/ui/Page.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import Store, { AppState } from "./Store.ts";
import { MapStateToProps, PropsWithState } from "./types.ts";
import { isEqual } from "./utils.ts";

export function connect<StateSlice extends AppState, TProps extends BaseProps>(
  mapStateToProps: MapStateToProps<StateSlice>,
) {
  return function (ConnectedPage: typeof Page<TProps>) {
    return class extends ConnectedPage {
      constructor(propsWithState: PropsWithState<StateSlice, TProps>) {
        let state = mapStateToProps(Store.getState());

        /* Avoiding side-effects */
        const initialProps = { ...propsWithState, state };
        super(initialProps);

        const handleUpdate = (args: unknown) => {
          const nextState = args as StateSlice;

          Store.on("updated", () => {
            if (!isEqual(state, nextState)) {
              this.setProps({
                ...propsWithState,
                state: nextState,
              });
            }

            state = nextState;
          });
        };

        Store.on("updated", handleUpdate);

        this.unsubscribe = () => Store.off("updated", handleUpdate);
      }

      private unsubscribe?: () => void;

      public componentDidUnmount(): void {
        this.unsubscribe?.();
        super.componentDidUnmount();
      }

      public getSourceMarkup(): string {
        return super.getSourceMarkup();
      }
    };
  };
}
