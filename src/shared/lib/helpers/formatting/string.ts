export function tinyDate(
  input: string | Date,
  opts?: { locale?: string; timeZone?: string },
): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(opts?.locale, {
    timeZone: opts?.timeZone,
    day: "numeric",
    month: "short",
  }).format(date);
}
