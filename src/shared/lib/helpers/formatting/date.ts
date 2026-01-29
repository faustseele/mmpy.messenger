export function tinyDate(
  input: string | Date,
  opts?: { locale?: string; timeZone?: string },
): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const locale = opts?.locale ?? undefined;
  const tz = opts?.timeZone;

  const formatAbsolute = (targetDate: Date): string => {
    const yearFmt = new Intl.DateTimeFormat(locale, { timeZone: tz, year: "numeric" });
    const sameYear = yearFmt.format(targetDate) === yearFmt.format(now);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      day: "numeric",
      month: "short",
    };
    if (!sameYear) {
      options.year = "2-digit";
    }
    return new Intl.DateTimeFormat(locale, options).format(targetDate);
  };

  if (diffMs < 0) {
    return formatAbsolute(date);
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" });

  if (diffSeconds < 60) {
    return "now";
  }

  let value: number;
  let unit: string;

  if (diffSeconds < 3600) {
    value = Math.round(diffSeconds / 60);
    unit = "minute";
  } else if (diffSeconds < 86400) {
    value = Math.round(diffSeconds / 3600);
    unit = "hour";
  } else if (diffSeconds < 7 * 86400) {
    value = Math.round(diffSeconds / 86400);
    unit = "day";
  } else if (diffSeconds < 30 * 86400) {
    value = Math.round(diffSeconds / (7 * 86400));
    unit = "week";
  } else if (diffSeconds < 365 * 86400) {
    value = Math.round(diffSeconds / (30 * 86400));
    unit = "month";
  } else {
    return formatAbsolute(date);
  }

  return rtf.format(-value, unit as Intl.RelativeTimeFormatUnit);
}
