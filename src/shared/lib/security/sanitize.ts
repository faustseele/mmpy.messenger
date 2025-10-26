export function setTextSafe(el: Element, value: unknown): void {
  el.textContent = sanitize(value);
}

export function sanitize(input: unknown): string {
  if (input == null) return "";
  return escapeHtml(String(input));
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
