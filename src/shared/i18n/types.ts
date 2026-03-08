export type Locale = "en" | "ru" | "de" | "fr" | "es" | "jp" | "th";

/**
 * recursive type representing a nested translation dictionary
 */
export type Dictionary = {
  [key: string]: string | Dictionary;
};
