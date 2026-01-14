import { harmonicScaleRatiosToLetters, constantIntervalColours } from "../constants.js";

export function getColourHarmonicScale(ratio) {
  return Object.keys(harmonicScaleRatiosToLetters).reduce((harmonicScaleNoteKey) => {
    if (ratio.ratioString === harmonicScaleNoteKey) return constantIntervalColours["1/1"];
    return "#cccccc";
  });
}