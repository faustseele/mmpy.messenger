import { i18n } from "@shared/i18n/I18nService.ts";
import { FieldType } from "../../ui/Input/types.ts";
import {
  DISPLAY_NAME_ERROR_KEY,
  DISPLAY_NAME_REGEX,
  EMAIL_ERROR_KEY,
  EMAIL_REGEX,
  LOGIN_ERROR_KEY,
  LOGIN_REGEX,
  NAME_ERROR_KEY,
  NAME_REGEX,
  PASSWORD_ERROR_KEY,
  PASSWORD_REGEX,
  PHONE_ERROR_KEY,
  PHONE_REGEX,
  SURNAME_ERROR_KEY,
  SURNAME_REGEX,
} from "./consts.ts";

/** 'Ё' Char has U+0401, whereas 'А-Я' range includes
 * symbols from U+0410 up to U+042F. Same thing for 'ё'!
 * Eslint is wrongly complaining about unused vars */

// eslint-disable-next-line no-unused-vars
const getRegex: Record<FieldType, (value: string) => string> = {
  name: (value: string): string => {
    return NAME_REGEX.test(value) ? "" : i18n.t(NAME_ERROR_KEY);
  },
  surname: (value: string): string => {
    return SURNAME_REGEX.test(value) ? "" : i18n.t(SURNAME_ERROR_KEY);
  },
  login: (value: string): string => {
    return LOGIN_REGEX.test(value) ? "" : i18n.t(LOGIN_ERROR_KEY);
  },
  email: (value: string): string => {
    return EMAIL_REGEX.test(value) ? "" : i18n.t(EMAIL_ERROR_KEY);
  },
  password: (value: string): string => {
    return PASSWORD_REGEX.test(value) ? "" : i18n.t(PASSWORD_ERROR_KEY);
  },
  phone: (value: string): string => {
    return PHONE_REGEX.test(value) ? "" : i18n.t(PHONE_ERROR_KEY);
  },
  display_name: (value: string): string => {
    return DISPLAY_NAME_REGEX.test(value) ? "" : i18n.t(DISPLAY_NAME_ERROR_KEY);
  },
  message: (value: string): string => {
    return value.length > 0 ? "" : i18n.t("validation.noValue");
  },
  search: (value: string): string => {
    return value.length > 0 ? "" : i18n.t("validation.noValue");
  },
  oldPassword: (value: string): string => {
    return PASSWORD_REGEX.test(value) ? "" : i18n.t(PASSWORD_ERROR_KEY);
  },
  newPassword: (value: string): string => {
    return PASSWORD_REGEX.test(value) ? "" : i18n.t(PASSWORD_ERROR_KEY);
  },
};

/**
 * Validates a value based on the field name.
 * @param fieldName The name of the field to validate (e.g., 'login', 'password').
 * @param value The value to validate.
 * @returns An empty string if valid, or an error message string if invalid.
 */
export function validateInputField(
  fieldName: FieldType | "",
  value?: string,
): string {
  if (!fieldName) return "";
  if (!value) return i18n.t("validation.noValue");
  return getRegex[fieldName](value);
}
