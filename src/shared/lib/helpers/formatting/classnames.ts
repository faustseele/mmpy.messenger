export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts
    .flatMap((p) => (typeof p === "string" ? p.trim().split(/\s+/) : []))
    .filter(Boolean)
    .join(" ");
