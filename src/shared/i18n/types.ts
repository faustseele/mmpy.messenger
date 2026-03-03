export type Locale = "en" | "de" | "ru" | "jp" | "th" | "es" | "fr";

/**
 * recursive type representing a nested translation dictionary
 */
export type Dictionary = {
  [key: string]: string | Dictionary;
};
