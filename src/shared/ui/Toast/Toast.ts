import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import css from "./toast.module.css";
import { ToastProps, ToastType } from "./types.ts";

export class Toast extends Component<ToastProps> {
  constructor(props: ComponentProps<ToastProps, Toast>) {
    super(props);
  }

  public componentDidMount(): void {}

  public componentDidRender(): void {
    if (!this.element) {
      console.error("Toast: element is not defined", this.domService);
      return;
    }
    this.element.textContent = this.configs.message;
  }

  public showToast(message: string, type: ToastType = "info"): void {
    if (!this.element) return;
    console.log(
      `${css.toast} ${type === "error" ? css.toast_error : ""}`.trim(),
    );

    this.setProps({
      configs: {
        ...this.configs,
        message,
        type,
        classNames:
          `${css.toast} ${type === "error" ? css.toast_error : ""}`.trim(),
      },
    });

    this.element.classList.add(css.toast_visible);
    // setTimeout(() => {
    //   this.element?.classList.remove(css.toast_visible);
    // }, 2000); /* match CSS transition duration */
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
  public getSourceMarkup(): string {
    return /*html*/ ``;
  }
}
