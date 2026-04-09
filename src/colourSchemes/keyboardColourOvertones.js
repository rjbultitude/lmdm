import { constantIntervalColours } from "../constants.js";

export function getColourOverTones(ratio) {
  if (ratio.denominator === 1) return constantIntervalColours["1/1"];
  return "#cccccc";
}

export function getColourUnderTones(ratio) {
  if (ratio.numerator === 1) return constantIntervalColours["1/1"];
  return "#cccccc";
}