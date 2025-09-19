import { constantIntervalColours, DEFAULT_COLOUR, KEYBOARD_BTN_CLASSNAME } from "./constants.js";

function getSubHarmonicRatio(key) {
  const subharmonicRatio = key.split(/(?=\/)|(?<=\/)/g).reverse().join("");
  return subharmonicRatio;
}

// Mirrored overlay
export function getColourMirrored(ratio) {
  let fractionColour = constantIntervalColours[ratio.ratioString];
  if (fractionColour) return fractionColour;
  const ratioReversed = getSubHarmonicRatio(ratio.ratioString);
  fractionColour = constantIntervalColours[ratioReversed];
  if (fractionColour) return fractionColour;
  // TODO. Needs fixing
  const higherRatio = checkForRatioOctaves({ratio, up: true});
  fractionColour = constantIntervalColours[higherRatio];
  if (fractionColour) return fractionColour;
  const lowerRatio = checkForRatioOctaves({ratio, up: false});
  fractionColour = constantIntervalColours[lowerRatio];
  if (fractionColour) return fractionColour;
  return DEFAULT_COLOUR;
}

function checkForRatioOctaves({ratio, up}) {
  let colour;
  let octaveDirection;
  if (up) {
    octaveDirection = 2
  } else {
    octaveDirection = 0.5
  };
  for (const colourKey in constantIntervalColours) {
    //const fraction = getFractionFromRatioString(colourKey); 
    colour = getRatioOctaves(ratio, octaveDirection);
    if (colour) return colour;
  }
}

function getRatioOctaves(ratio, base) {
  const maxPower = 4;
    for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
      const ratioNumeratorPow = ratio.numerator * Math.pow(base, exponentOctave);
      const ratioDenominatorPow = ratio.denominator * Math.pow(base, exponentOctave);
      // if whole numbers
      if (Number.isInteger(ratioNumeratorPow) && Number.isInteger(ratioDenominatorPow)) {
        return `${ratioNumeratorPow}/${ratioDenominatorPow}`;
      }
    }
}