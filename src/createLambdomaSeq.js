import { GRID_SIZE, CONSONANT_INTERVALS, constantIntervalColours } from "./constants.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = GRID_SIZE;
const UP = "up";

function getIntervalFromOctaves({ratio, fraction, maxNumDecimals, fractionFixedDecimalNum, base}) {
  const maxPower = 4;
  let intervalFractionPow;
  let debug;
  if (ratio.numerator === 4 && ratio.denominator === 9) {
    debug = true;
    console.log("ratio", ratio);
    console.log("fraction", fraction);
  }
  for (let exponentOctave = 0; exponentOctave < maxPower; exponentOctave++) {
    // does this need to be fixed to 3 decimal places before being multiplied?
    intervalFractionPow = fraction * Math.pow(base, exponentOctave);
    const intervalFractionPowFixed = intervalFractionPow.toFixed(maxNumDecimals);
    const intervalFractionPowFixedNum = parseFloat(intervalFractionPowFixed);
    if (debug) {
      console.log("intervalFractionPow", intervalFractionPow);
      console.log("intervalFractionPowFixed", intervalFractionPowFixed);
      console.log("intervalFractionPowFixedNum", intervalFractionPowFixedNum);
    }
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

function checkForOctaves({ratio, maxNumDecimals, fractionFixedDecimalNum, up}) {
  let colour;
  let octaveDirection;
  if (up) {
    octaveDirection = 2
  } else {
    octaveDirection = 0.5
  };
  // Going up
  for (const colourKey in constantIntervalColours) {
    const fraction = getFractionFromRatioString(colourKey);
    // check it is truthy
    colour = getIntervalFromOctaves({ratio, fraction, maxNumDecimals, fractionFixedDecimalNum, base: octaveDirection});
    if (colour) return colour;
  }
}

function getColour(ratio) {
  // If we can just find it via its key
  let fractionColour = constantIntervalColours[ratio.ratioString];
  if (fractionColour) return fractionColour;
  // failing that match using fractions
  const maxNumDecimals = 3;
  const fraction = ratio.fraction;
  const fractionFixedDecimal = fraction.toFixed(maxNumDecimals);
  const fractionFixedDecimalNum = parseFloat(fractionFixedDecimal);
  fractionColour = checkForOctaves({ratio, maxNumDecimals, fractionFixedDecimalNum, up: true});
  if (fractionColour) return fractionColour;
  fractionColour = checkForOctaves({ratio, maxNumDecimals, fractionFixedDecimalNum, up: false});
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