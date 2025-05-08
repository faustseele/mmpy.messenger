export type Button = {
  type: "button" | "submit";
  label: string;
  modifier?: string;
  isSilent?: boolean;
  link?: Link;
};
