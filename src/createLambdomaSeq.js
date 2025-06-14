import { GRID_SIZE, CONSONANT_INTERVALS } from "./constants.js";

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

function getIntervalFromOctaves(intervalObj, maxNumDecimals, fractionFixedDecimalNum, base) {
  const maxPower = 4;
  let intervalFractionPow;
    for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
      intervalFractionPow = intervalObj.fraction * Math.pow(base, exponentOctave);
      const intervalFractionPowFixed = intervalFractionPow.toFixed(maxNumDecimals);
      const intervalFractionPowFixedNum = parseFloat(intervalFractionPowFixed);
      if (intervalFractionPowFixedNum === fractionFixedDecimalNum) {
        return CONSONANT_INTERVALS[intervalObj.fraction]?.colour;
      }
    }
}

function checkForOctaves(maxNumDecimals, fractionFixedDecimalNum) {
  const constantIntervalsArr = Object.keys(CONSONANT_INTERVALS);
  let colour;
  for (const intervalKey of constantIntervalsArr) {
    const intervalObj = CONSONANT_INTERVALS[intervalKey];
    // check it is truthy
    colour = getIntervalFromOctaves(intervalObj, maxNumDecimals, fractionFixedDecimalNum, 2);
    if (colour) return colour;
  }
  for (const intervalKey of constantIntervalsArr) {
    const intervalObj = CONSONANT_INTERVALS[intervalKey];
    colour = getIntervalFromOctaves(intervalObj, maxNumDecimals, fractionFixedDecimalNum, 0.5);
    return colour;
  }
}

function getColour(fraction) {
  const maxNumDecimals = 3;
  const fractionFixedDecimal = fraction.toFixed(maxNumDecimals);
  const fractionFixedDecimalNum = parseFloat(fractionFixedDecimal);
  const fractionColour = CONSONANT_INTERVALS[fractionFixedDecimalNum]?.colour;
  if (fractionColour) return fractionColour;
  return checkForOctaves(maxNumDecimals, fractionFixedDecimalNum);
}

class ratio {
  constructor(numerator, denominator, colour) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.colour = colour;
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
    const newRatio = new ratio(numeratorCount, denominatorCount);
    const thisFraction = newRatio.calcFraction();
    const thisColour = getColour(thisFraction);
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