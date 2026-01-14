import { harmonicScale, constantIntervalColours } from "../constants.js";

export function getColourHarmonicScale(ratio) {
  let colour;
  Object.keys(harmonicScale).forEach((harmonicScaleNoteKey) => {
    if (ratio.ratioString === harmonicScaleNoteKey) {
      colour = constantIntervalColours["1/1"];
      console.debug("ratio.ratioString === harmonicScaleNoteKey", colour);
      return;
    }
    colour = "#cccccc";
  });
  return colour;
}