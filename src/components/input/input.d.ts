export type Input = {
  id: string;
  type: "text" | "email" | "password" | "tel";
  label: string;
  placeholder?: string;
};
