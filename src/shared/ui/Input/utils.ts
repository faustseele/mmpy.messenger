import { FieldType, InputType } from "./types.ts";

export function getInputTypeByFieldId(fieldId: FieldType): InputType {
  switch (fieldId) {
    case "name":
      return "text";
    case "surname":
      return "text";
    case "login":
      return "text";
    case "email":
      return "email";
    case "password":
      return "password";
    case "phone":
      return "tel";
    case "display_name":
      return "text";
    case "search":
      return "text";
    case "message":
      return "text";
    case "oldPassword":
      return "password";
    case "newPassword":
      return "password";
    default:
      return "text";
  }
}
