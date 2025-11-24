//keyboardColourOctavesMatter
import { constantIntervalColours, constantIntervalOutlierColours, DEFAULT_COLOUR } from "./constants.js";
import { getFraction } from "./createLambdomaSeq.js";

function checkForOctaves({ratio, maxNumDecimals, up, constantIntervalColoursCombined}) {
  let colour;
  let octaveDirection;
  if (up) {
    octaveDirection = 2
  } else {
    octaveDirection = 0.5
  };
  // Going up
  for (const colourKey in constantIntervalColoursCombined) {
    colour = getIntervalColourFromOctaves({ratio, colourKey, maxNumDecimals, base: octaveDirection, constantIntervalColoursCombined});
    if (colour) return colour;
  }
}

function getIntervalColourFromOctaves({ratio, colourKey, maxNumDecimals, base, constantIntervalColoursCombined}) {
  const maxPower = 4;
  const colourKeyFraction = getFractionFromRatioString(colourKey);
  // this is a calculation done within the ratio class
  //const fraction = ratio.fraction;
  const fraction = getFraction({ numerator: ratio.numerator, denominator: ratio.denominator });
  const fractionFixedDecimal = fraction.toFixed(maxNumDecimals);
  const fractionFixedDecimalNum = parseFloat(fractionFixedDecimal);
  for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
    const colourKeyFractionPow = colourKeyFraction * Math.pow(base, exponentOctave);
    const colourKeyFractionPowFixed = colourKeyFractionPow.toFixed(maxNumDecimals);
    const colourKeyFractionPowFixedNum = parseFloat(colourKeyFractionPowFixed);
    if (colourKeyFractionPowFixedNum === fractionFixedDecimalNum) {
      return constantIntervalColoursCombined[colourKey];
    }
  }
}

function getFractionFromRatioString(ratioString) {
  const fractionArray = ratioString.split("/");
  const fraction = fractionArray[0] / fractionArray[1];
  return fraction;
}

export function getColourOctavesMatter(ratio) {
  const constantIntervalColoursCombined = {...constantIntervalColours, ...constantIntervalOutlierColours};
  // If we can, find it via its key
  let fractionColour = constantIntervalColoursCombined[ratio.ratioString];
  if (fractionColour) return fractionColour;
  // failing that match using fractions
  const maxNumDecimals = 3;
  fractionColour = checkForOctaves({ratio, maxNumDecimals, up: true, constantIntervalColoursCombined});
  if (fractionColour) return fractionColour;
  fractionColour = checkForOctaves({ratio, maxNumDecimals, up: false, constantIntervalColoursCombined});
  if (fractionColour) return fractionColour;
  return DEFAULT_COLOUR;
}