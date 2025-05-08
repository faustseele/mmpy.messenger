export type Message = {
  isOutgoing: boolean;
  isIncoming: boolean;
  isDateBubble: boolean;
  text?: string;
  image?: string;
  date: string;
};
