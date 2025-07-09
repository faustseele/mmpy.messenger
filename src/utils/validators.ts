import { TFieldNames } from "../components/input/input.d";

/* 'value' is actually used */
// eslint-disable-next-line no-unused-vars
const getRegex: Record<TFieldNames, (value: string) => string> = {
  name: (value: string): string => {
    const regex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
    return regex.test(value) ? "" : "Странное имя.";
  },
  surname: (value: string): string => {
    const regex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
    return regex.test(value) ? "" : "Странная у вас фамилия.";
  },
  login: (value: string): string => {
    const regex = /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(value) ? "" : "Плохой логин.";
  },
  email: (value: string): string => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(value) ? "" : "Невалидная почта.";
  },
  password: (value: string): string => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    return regex.test(value)
      ? ""
      : "Пароль: 8-40 символов, минимум 1 цифра и заглавная буква.";
  },
  phone: (value: string): string => {
    const regex = /^\+?\d{10,15}$/;
    return regex.test(value) ? "" : "Неправильный номер телефона.";
  },
  message: (value: string): string => {
    return value.length > 0 ? "" : "Напишите что-нибудь.";
  },
};

/**
 * Validates a value based on the field name.
 * @param fieldName The name of the field to validate (e.g., 'login', 'password').
 * @param value The value to validate.
 * @returns An empty string if valid, or an error message string if invalid.
 */
export function validateInputField(
  fieldName: TFieldNames | '',
  value?: string,
): string {
  if (!fieldName) return "";
  if (!value) return "Заполните поле.";
  return getRegex[fieldName](value);
}
