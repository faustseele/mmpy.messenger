import Component from "@shared/lib/Component/model/Component.ts";
import { ComponentProps } from "@shared/lib/Component/model/types.ts";
import css from "./toast.module.css";
import { ToastProps, ToastType } from "./types.ts";

export class Toast extends Component<ToastProps> {
  private timeoutId: number | null = null;

  constructor(props: ComponentProps<ToastProps, Toast>) {
    super(props);
  }

  public componentDidMount(): void {
    this.showToast();
    this.scheduleHide();
  }

  public componentDidRender(): void {
    this.showToast();
    this.scheduleHide();
  }

  private showToast(): void {
    if (!this.element) return;

    /* reflow to ensure animation plays */
    this.show();
  }

  private scheduleHide(): void {
    const duration = this.getDuration();
    this.timeoutId = window.setTimeout(() => {
      this.hideToast();
    }, duration);
  }

  private hideToast(): void {
    if (!this.element) return;

    this.element.classList.remove(css.toast_visible);
    /* rm from DOM after animation */
    setTimeout(() => {
      this.hide();
    }, 300); /* match CSS transition duration */
  }

  private getDuration(): number {
    const type = this.configs.type;
    if (type === "success") return 1000;
    return 2000; /* def for info */
  }

  public updateMessage(message: string, type: ToastType = "info"): void {
    this.setProps({
      configs: {
        message,
        type,
      },
    });

    /* clear existing timeout and reschedule */
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.scheduleHide();
  }

  private getToastTypeClass(type: ToastType): string {
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

  public getSourceMarkup(): string {
    const message = this.configs.message;

    return /*html*/ `
        <span class="${css.toast}"">${message}</span>
    `;
  }
}
