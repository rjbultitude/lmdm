import { harmonicScaleRatiosToLetters, constantIntervalColours } from "../constants.js";

export function getColourHarmonicScale(ratio) {
  let colour;
  Object.keys(harmonicScaleRatiosToLetters).forEach((harmonicScaleNoteKey) => {
    if (ratio.ratioString === harmonicScaleNoteKey) {
      colour = constantIntervalColours["1/1"];
      return;
    }
    colour = "#cccccc";
  });
  return colour;
}