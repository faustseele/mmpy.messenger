const NAME_REGEX = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯЁё-]*$/;
const SURNAME_REGEX = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯЁё-]*$/;
const LOGIN_REGEX = /^[a-zA-Zа-яА-ЯЁё][a-zA-Zа-яА-ЯЁё-]{2,19}$/i;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
const PHONE_REGEX = /^\+?\d{10,15}$/;
const DISPLAY_NAME_REGEX = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯЁё-]*$/;

export {
  DISPLAY_NAME_REGEX,
  EMAIL_REGEX,
  LOGIN_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  SURNAME_REGEX
};

/* i18n keys for validation error messages; resolved at validation time */
const NAME_ERROR_KEY = "validation.name";
const SURNAME_ERROR_KEY = "validation.surname";
const LOGIN_ERROR_KEY = "validation.login";
const EMAIL_ERROR_KEY = "validation.email";
const PASSWORD_ERROR_KEY = "validation.password";
const PHONE_ERROR_KEY = "validation.phone";
const DISPLAY_NAME_ERROR_KEY = "validation.displayName";

export {
  DISPLAY_NAME_ERROR_KEY,
  EMAIL_ERROR_KEY,
  LOGIN_ERROR_KEY,
  NAME_ERROR_KEY,
  PASSWORD_ERROR_KEY,
  PHONE_ERROR_KEY,
  SURNAME_ERROR_KEY
};

