import { globalBus } from "@/shared/lib/EventBus/EventBus.ts";
import { cx } from "@/shared/lib/helpers/formatting/classnames.ts";
import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import css from "./toast.module.css";
import { ToastPayload, ToastProps } from "./types.ts";

export class Toast extends Component<ToastProps> {
  constructor(props: ComponentProps<ToastProps, Toast>) {
    super(props);
  }

  public getRootTagCx(configs?: ToastProps["configs"]): string {
    const { type, show } = configs ?? this.configs;
    return cx(
      css.toast,
      type === "error" && css.toast_error,
      show && css.toast_visible,
    );
  }

  public componentDidMount(): void {
    /* mounting Toast to globalBus */
    globalBus.on("show-toast", (payload: ToastPayload) =>
      this.showToast(payload),
    );
  }

  public componentDidRender(): void {
    if (!this.element) {
      console.error("Toast: element is not defined", this.domService);
      return;
    }
    this.element.textContent = this.configs.message;
  }

  public showToast({ message, type = "info" }: ToastPayload): void {
    if (!this.element) return;

    this.setProps({
      configs: {
        message,
        type,
        show: true,
      },
    });

    setTimeout(() => {
      this.setProps({ configs: { show: false } });
    }, 2000);
  }

  public getInnerMarkup(): string {
    return /*html*/ ``;
  }
}
