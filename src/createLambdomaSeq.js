import { GRID_SIZE, constantIntervalColours } from "./constants.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = GRID_SIZE;

function getIntervalColourFromOctaves({ratio, colourKey, maxNumDecimals, base}) {
  const maxPower = 4;
  const colourKeyFraction = getFractionFromRatioString(colourKey);
  const fraction = ratio.fraction;
  const fractionFixedDecimal = fraction.toFixed(maxNumDecimals);
  const fractionFixedDecimalNum = parseFloat(fractionFixedDecimal);
  for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
    const colourKeyFractionPow = colourKeyFraction * Math.pow(base, exponentOctave);
    const colourKeyFractionPowFixed = colourKeyFractionPow.toFixed(maxNumDecimals);
    const colourKeyFractionPowFixedNum = parseFloat(colourKeyFractionPowFixed);
    if (colourKeyFractionPowFixedNum === fractionFixedDecimalNum) {
      return constantIntervalColours[colourKey];
    }
  }
}

function getFractionFromRatioString(ratioString) {
  const fractionArray = ratioString.split("/");
  const fraction = fractionArray[0] / fractionArray[1];
  return fraction;
}

function checkForOctaves({ratio, maxNumDecimals, up}) {
  let colour;
  let octaveDirection;
  if (up) {
    octaveDirection = 2
  } else {
    octaveDirection = 0.5
  };
  // Going up
  for (const colourKey in constantIntervalColours) {
    colour = getIntervalColourFromOctaves({ratio, colourKey, maxNumDecimals, base: octaveDirection});
    if (colour) return colour;
  }
}

function getColour(ratio) {
  // If we can just find it via its key
  let fractionColour = constantIntervalColours[ratio.ratioString];
  if (fractionColour) return fractionColour;
  // failing that match using fractions
  const maxNumDecimals = 3;
  fractionColour = checkForOctaves({ratio, maxNumDecimals, up: true});
  if (fractionColour) return fractionColour;
  fractionColour = checkForOctaves({ratio, maxNumDecimals, up: false});
  if (fractionColour) return fractionColour;
}

class Ratio {
  constructor(numerator, denominator, colour) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.colour = colour;
    this.ratioString = `${numerator}/${denominator}`;
  }
  get fraction() {
    return this.calcFraction();
  }

  set setColour(colour) {
    this.colour = colour;
  }

  calcFraction() {
    return this.numerator / this.denominator;
  }
}
/*  This creates a lambdoma sequence
    where the first row is ascending numerators
    columns are ascending denominators */
function createMasterLamdomaSeq(maxLoopSize) {
  const masterLamdomaArr = [];
  let count = 1;
  for (let index = 0; index < maxLoopSize; index++) {
    const lambdomaSequence = createLambdomaSequence({
      startingNumerator: count,
      startingDenominator: 1, 
      loopSize: GRID_SIZE,
      type: denomination
    });
    masterLamdomaArr.push(lambdomaSequence);
    count += 1;
  }
  return masterLamdomaArr.reverse();
}

export function createLambdomaSequence({startingNumerator, startingDenominator, loopSize, type}) {
  const thisArray = [];
  let numeratorCount = startingNumerator;
  let denominatorCount = startingDenominator;
  let numeratorCountAmt = 0;
  let denominatorCountAmt = 0;
  switch (type) {
    case numeration: 
      numeratorCountAmt = 1;
      denominatorCountAmt = 0;
      break;
    case denomination: 
      numeratorCountAmt = 0;
      denominatorCountAmt = 1;
      break;
    case ascendBoth: 
      numeratorCountAmt = 1;
      denominatorCountAmt = 1;
      break;
  }
  for (let index = 0; index < loopSize; index++) {
    const newRatio = new Ratio(numeratorCount, denominatorCount);
    //const thisFraction = newRatio.calcFraction();
    //const thisColour = getColour(thisFraction);
    const thisColour = getColour(newRatio);
    newRatio.setColour = thisColour;
    thisArray.push(newRatio);
    numeratorCount += numeratorCountAmt;
    denominatorCount += denominatorCountAmt;
  }
  return thisArray.reverse();
}

const masterLamdomaSeq = createMasterLamdomaSeq(maxLoopSize);

export default masterLamdomaSeq;

console.log(masterLamdomaSeq);