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

export const getChatNumber = () =>
  Math.floor(1000 + Math.random() * 9000).toString() +
  String.fromCharCode(97 + Math.random() * 26);
