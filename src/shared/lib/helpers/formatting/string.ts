
export const getChatNumber = () =>
  Math.floor(1000 + Math.random() * 9000).toString() +
  String.fromCharCode(97 + Math.random() * 26);
