import { noteLabels } from "../config/const.ts";

export function randomNoteLabel() {
  return noteLabels[Math.floor(Math.random() * noteLabels.length)];
}
