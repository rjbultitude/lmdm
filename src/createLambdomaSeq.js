import { GRID_SIZE, COLOURS } from "./constants.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = GRID_SIZE;

function checkOctaves(fraction, number) {
  return number / 2 === fraction || number === fraction || number * 2 === fraction;
}

function getColour(fraction) {
  const fractionThreePlaces = parseFloat(fraction.toFixed(3));
  // Octaves
  if (checkOctaves(fraction, 1)) {
    return COLOURS.GREEN;
  }
  // Perfect 5th
  if (checkOctaves(fraction, 1.5)) {
    return COLOURS.YELLOW;
  }
  // Perfect 4th
  if (checkOctaves(fractionThreePlaces, 1.333)) {
    return COLOURS.ORANGE;
  }
  // Major Third
  if (checkOctaves(fraction, 1.25)) {
    return COLOURS.BLUE;
  }
  // Minor Third
  if (checkOctaves(fraction, 1.2)) {
    return COLOURS.INDIGO;
  }
  // Harmonic Seventh
  if (checkOctaves(fraction, 1.75)) {
    return COLOURS.INDIGO;
  }
  // Minor Sixth
  if (checkOctaves(fraction, 1.6)) {
    return COLOURS.INDIGO;
  }
  // Major Second
  if (checkOctaves(fraction, 1.125)) {
    return COLOURS.INDIGO;
  }
  // Minor Second
  if (checkOctaves(fractionThreePlaces, 1.106)) {
    return COLOURS.INDIGO;
  }
  return COLOURS.GREY;
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