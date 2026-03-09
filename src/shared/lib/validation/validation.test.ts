import { i18n } from "@shared/i18n/I18nService.ts";
import { describe, expect, it } from "vitest";
import { EMAIL_ERROR_KEY, LOGIN_ERROR_KEY, PASSWORD_ERROR_KEY } from "./consts.ts";
import { validateInputField } from "./utils.ts";

describe("Shared/Lib: Validation", () => {
  /* resolved at test-time so locale is applied */
  const emailErr = () => i18n.t(EMAIL_ERROR_KEY);
  const passwordErr = () => i18n.t(PASSWORD_ERROR_KEY);
  const loginErr = () => i18n.t(LOGIN_ERROR_KEY);

  /* email validation */
  describe("Field: Email", () => {
    it.each([
      /* valid */
      ["test@example.com", ""],
      ["user.name@domain.co.uk", ""],
      ["user-name@domain.com", ""],
      /* invalid */
      ["plainaddress"],
      ["@missinguser.com"],
      ["username@.com"],
      ["user@domain"],
    ])("should validate %s", (email, expected?: string) => {
      const expectedErr = expected ?? emailErr();
      expect(validateInputField("email", email)).toBe(expectedErr);
    });
  });

  /* password validation */
  describe("Field: Password", () => {
    it.each([
      /* valid */
      ["Password123", ""],
      ["HardP@ssw0rd", ""],
      /* invalid */
      ["password123"],
      ["Password"],
      ["12345678"],
      ["Pass1"],
    ])("should validate password rules for '%s'", (password, expected?: string) => {
      const expectedErr = expected ?? passwordErr();
      expect(validateInputField("password", password)).toBe(expectedErr);
    });
  });

  /* login validation */
  describe("Field: Login", () => {
    it.each([
      /* valid */
      ["Ivan", ""],
      ["Иван", ""],
      ["Anna-Maria", ""],
      /* invalid */
      ["ivan0"],
      ["иван0"],
      ["Ivan123"],
      ["Ivan The Great"],
    ])("should validate login rules for '%s'", (login, expected?: string) => {
      const expectedErr = expected ?? loginErr();
      expect(validateInputField("login", login)).toBe(expectedErr);
    });
  });
});
