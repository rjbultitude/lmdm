import { constantIntervalColours, DEFAULT_COLOUR } from "./constants.js";

function getSubHarmonicRatio(key) {
  const subharmonicRatio = key.split(/(?=\/)|(?<=\/)/g).reverse().join("");
  return subharmonicRatio;
}

// Mirrored overlay
export function getColourMirrored(ratio) {
  if (ratio.numerator === 6 && ratio.denominator === 8) console.debug("6/8");
  // Find an exact match just using key
  const fractionColourExactMatch = constantIntervalColours[ratio.ratioString];
  if (fractionColourExactMatch) return fractionColourExactMatch;
  // Find the reversed match using key
  const ratioReversed = getSubHarmonicRatio(ratio.ratioString);
  const fractionColourReversedMatch = constantIntervalColours[ratioReversed];
  if (fractionColourReversedMatch) return fractionColourReversedMatch;
  // Find a match where numerator and dominator are double
  const higherRatio = checkForRatioOctaves({ratio, up: true});
  const fractionColourHigherMatch = constantIntervalColours[higherRatio];
  if (fractionColourHigherMatch) return fractionColourHigherMatch;
  // TODO check reversed higher ration too!
  // find a match where numerator and denominator are half
  const lowerRatio = checkForRatioOctaves({ratio, up: false});
  const fractionColourLowerMatch = constantIntervalColours[lowerRatio];
  if (fractionColourLowerMatch) return fractionColourLowerMatch;
  // TODO check reversed lower ration too!
  // Use default when no matches
  return DEFAULT_COLOUR;
}

/* Is this ratio exactly double or half
   one of the constantIntervalColours keys
*/
function checkForRatioOctaves({ratio, up}) {
  let colour;
  let octaveDirection;
  if (up) {
    octaveDirection = 2
  } else {
    octaveDirection = 0.5
  };
  for (const colourKey in constantIntervalColours) {
    colour = getRatioOctaves(ratio, colourKey, octaveDirection);
    if (colour) return colour;
  }
}

/* Ratio is current ratio object
   Colour key is ratio as string from constantIntervalColours
   Base is either 2 to double or 0.5 to halve */
function getRatioOctaves(ratio, colourKey, base) {
  const maxPower = 4;
  for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
    const ratioNumeratorPow = ratio.numerator * Math.pow(base, exponentOctave);
    const ratioDenominatorPow = ratio.denominator * Math.pow(base, exponentOctave);
    // if whole numbers
    if (Number.isInteger(ratioNumeratorPow) && Number.isInteger(ratioDenominatorPow)) {
      const wholeNumRatio = `${ratioNumeratorPow}/${ratioDenominatorPow}`;
      if (wholeNumRatio === "3/4") console.debug("6/8 is 3/4", colourKey);
      if (wholeNumRatio === colourKey) {
        return colourKey;
      }
    }
  }
}