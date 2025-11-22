import { KEYBOARD_COLOURSCHEME_OCT, KEYBOARD_COLOURSCHEME_MIR, KEYBOARD_COLOURSCHEME_GRA } from "./constants.js";
import { getColourMirrored } from "./keyboardColourMirrored.js";
import { getColourOctavesMatter } from "./keyboardColourOctavesMatter.js";
import { getColourGraduated, generateGradientArray } from "./keyboardColourGraduated.js";
import { getHSLCSSFromRatio } from "./colourSelect.js"; 
import state from "./state.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = state.gridSize;

export function getFraction({ numerator, denominator }) {
  return numerator / denominator;
}

class Ratio {
  constructor({numerator, denominator, colour, colourHSL, column, row}) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.colour = colour;
    this.colourHSL = colourHSL;
    this.column = column;
    this.row = row;
    this.ratioString = `${numerator}/${denominator}`;
  }
  get fraction() {
    return this.calcFraction();
  }

  set setColour(colour) {
    this.colour = colour;
  }

  set setColourHSL(colourHSL) {
    this.colourHSL = colourHSL;
  }

  calcFraction() {
    return this.numerator / this.denominator;
  }
}
/*  This creates a lambdoma sequence
    where the first row is ascending numerators
    columns are ascending denominators */
export function createMasterLamdomaSeq(maxLoopSize) {
  const masterLamdomaArr = [];
  let count = 1;
  for (let index = 0; index < maxLoopSize; index++) {
    const lambdomaSequence = createLambdomaSequence({
      startingNumerator: count,
      startingDenominator: 1, 
      loopSize: maxLoopSize,
      type: denomination,
      column: index
    });
    masterLamdomaArr.push(lambdomaSequence);
    count += 1;
  }
  return masterLamdomaArr.reverse();
}

export function createLambdomaSequence({startingNumerator, startingDenominator, loopSize, type, column}) {
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
    const newRatio = new Ratio({
      numerator: numeratorCount,
      denominator: denominatorCount,
      column,
      row: index
    });
    let thisColour;
    /* TODO Why don't we just get all the colours once
       and set the one to show using state? */
    switch (state.colourScheme) {
      case KEYBOARD_COLOURSCHEME_OCT:
        thisColour = getColourOctavesMatter(newRatio);
        newRatio.setColour = thisColour;
        break;
      case KEYBOARD_COLOURSCHEME_MIR:
        thisColour = getColourMirrored(newRatio);
        newRatio.setColour = thisColour;
        break;
      case KEYBOARD_COLOURSCHEME_GRA:
        const colorGradientArr = generateGradientArray();
        const thisColourHSL = getColourGraduated(newRatio, colorGradientArr);
        thisColour = getHSLCSSFromRatio(thisColourHSL);
        newRatio.setColourHSL = thisColour;
        break;
      default:
        console.debug("no colour scheme found");
    }
    thisArray.push(newRatio);
    numeratorCount += numeratorCountAmt;
    denominatorCount += denominatorCountAmt;
  }
  return thisArray.reverse();
}

const masterLamdomaSeq = createMasterLamdomaSeq(maxLoopSize);

export default masterLamdomaSeq;

console.log(masterLamdomaSeq);