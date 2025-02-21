import masterLamdomaSeq from "./createLambdomaSeq.js";

export function getNote({
  rootNote,
  row,
  column
}) {
  return rootNote * masterLamdomaSeq[row][column].fraction;
}