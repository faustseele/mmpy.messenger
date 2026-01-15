import { globalBus } from "@/shared/lib/EventBus/EventBus.ts";
import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import css from "./toast.module.css";
import { ToastPayload, ToastProps } from "./types.ts";

export class Toast extends Component<ToastProps> {
  constructor(props: ComponentProps<ToastProps, Toast>) {
    super(props);
  }

  public componentDidMount(): void {
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
        classNames:
          `${css.toast} ${css.toast_visible} ${type === "error" ? css.toast_error : ""}`.trim(),
      },
    });

    setTimeout(() => {
      this.setProps({ configs: { classNames: css.toast } });
    }, 2000);
  }

  /*   private getToastTypeClass(type: ToastType): string {
    switch (type) {
      case "success":
        return css.toast_success;
      case "error":
        return css.toast_error;
      case "info":
      default:
        return css.toast_info;
    }
  }
 */
  public getInnerMarkup(): string {
    return /*html*/ ``;
  }
}
