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

function getColour(fraction) {
  const fractionThreePlaces = parseFloat(fraction.toFixed(3));
  // Unison
  if (checkOctaves(fraction, NOTE_MAP["Unison"].fraction)) {
    return NOTE_MAP["Unison"].colour;
  }
  // Perfect 5th
  if (checkOctaves(fraction, NOTE_MAP["Perfect_Fifth"].fraction)) {
    return NOTE_MAP["Perfect_Fifth"].colour;
  }
  // Perfect 4th
  if (checkOctaves(fractionThreePlaces, NOTE_MAP["Perfect_Fourth"].fraction)) {
    return NOTE_MAP["Perfect_Fourth"].colour;
  }
  // Major Third
  if (checkOctaves(fraction, NOTE_MAP["Major_Third"].fraction)) {
    return NOTE_MAP["Major_Third"].colour;
  }
  // Minor Third
  if (checkOctaves(fraction, NOTE_MAP["Minor_Third"].fraction)) {
    return NOTE_MAP["Minor_Third"].colour;
  }
  // Harmonic Seventh
  if (checkOctaves(fraction, NOTE_MAP["Harmonic_Seventh"].fraction)) {
    return NOTE_MAP["Harmonic_Seventh"].colour;
  }
  // Minor Sixth
  if (checkOctaves(fraction, NOTE_MAP["Minor_Sixth"].fraction)) {
    return NOTE_MAP["Minor_Sixth"].colour;
  }
  // Major Second
  if (checkOctaves(fraction, NOTE_MAP["Major_Second"].fraction)) {
    return NOTE_MAP["Major_Second"].colour;
  }
  // Minor Second
  if (checkOctaves(fractionThreePlaces, NOTE_MAP["Minor_Second"].fraction)) {
    return NOTE_MAP["Minor_Second"].colour;
  }
  return "grey";
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
    // Is there some other way of doing this?
    const thisColour = getColour(thisFraction);
    if (newRatio.numerator === 3 && newRatio.denominator === 4) {
      console.log("3/4 thisFraction", thisFraction);
    }
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