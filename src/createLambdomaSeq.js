import { GRID_SIZE, CONSONANT_INTERVALS, constantIntervalColours } from "./constants.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = GRID_SIZE;
const UP = "up";

// Don't we just want to use power (exponents) here?
function doubleOrHalveUntil(base, maxPower, scaleDirection) {
  // TODO Derive the exponentfrom the grid size
  maxPower = 3;
  let power;
  if (scaleDirection === UP) {
    power = 2;
  } else {
    power = 0.5;
  }
  if (power === maxPower) return;
  return Math.pow(base, power);
}

function getSubHarmonicRatio(key) {
  const subharmonicRatio = key.split(/(?=\/)|(?<=\/)/g).reverse().join("");
  return this[subharmonicRatio];
}

function getIntervalFromOctaves(fraction, maxNumDecimals, fractionFixedDecimalNum, base) {
  const maxPower = 4;
  let intervalFractionPow;
    for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
      intervalFractionPow = fraction * Math.pow(base, exponentOctave);
      const intervalFractionPowFixed = intervalFractionPow.toFixed(maxNumDecimals);
      const intervalFractionPowFixedNum = parseFloat(intervalFractionPowFixed);
      if (intervalFractionPowFixedNum === fractionFixedDecimalNum) {
        return CONSONANT_INTERVALS[fraction]?.colour;
      }
    }
}

function getFractionFromRatioString(ratioString) {
  const fractionArray = ratioString.split("/");
  const fraction = fractionArray[0] / fractionArray[1];
  return fraction;
}

function checkForOctaves({maxNumDecimals, fractionFixedDecimalNum}) {
  let colour;
  // Going up
  for (const colourKey in constantIntervalColours) {
    const fraction = getFractionFromRatioString(colourKey);
    // check it is truthy
    colour = getIntervalFromOctaves(fraction, maxNumDecimals, fractionFixedDecimalNum, 2);
    if (colour) return colour;
  }
  // Going down
  for (const colourKey in constantIntervalColours) {
    const fraction = getFractionFromRatioString(colourKey);
    colour = getIntervalFromOctaves(fraction, maxNumDecimals, fractionFixedDecimalNum, 0.5);
    return colour;
  }
}

function getColour(ratio) {
  const maxNumDecimals = 3;
  const fraction = ratio.fraction;
  const fractionFixedDecimal = fraction.toFixed(maxNumDecimals);
  const fractionFixedDecimalNum = parseFloat(fractionFixedDecimal);
  const fractionColour = constantIntervalColours[ratio.ratioString];
  console.log("fractionColour", fractionColour);
  if (fractionColour) return fractionColour;
  return checkForOctaves({maxNumDecimals, fractionFixedDecimalNum});
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