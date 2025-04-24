import { GRID_SIZE, NOTE_MAP } from "./constants.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = GRID_SIZE;
const geometricNumberStart = 2;

// function doubleUntil(numberToDouble, stopPoint) {
//   if (stopPoint === 32) return;
//   const newNumber = numberToDouble * geometricNumberStart;
//   geometricNumberStart * 2;
//   return newNumber;
// }

// function divideUntil(numberToDouble, stopPoint) {
//   if (stopPoint === 32) return;
//   const newNumber = numberToDouble * geometricNumberStart;
//   geometricNumberStart * 2;
//   return newNumber;
// }

function checkOctaves(fraction, number) {
  return number / 2 === fraction || number === fraction || number * 2 === fraction;
}

function countDecimals(value) { 
  if ((value % 1) != 0) {
    return value.toString().split(".")[1].length;  
  }
  return 0;
};

function getColour(fraction) {
  let fractionStr = '';
  if (countDecimals(fraction) > 1) {
    fractionStr = parseFloat(fraction.toFixed(3)).toString;
  }
  fractionStr = fraction.toString();
  return NOTE_MAP[fractionStr]?.colour;
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
/*  This creates a lambdome sequence
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