import { KeyboardColourScheme } from "./constants.js";
import { getColourMirrored } from "./colourSchemes/keyboardColourMirrored.js";
import { getColourOctavesMatter } from "./colourSchemes/keyboardColourOctavesMatter.js";
import { getColourHarmonicScale } from "./colourSchemes/keyboardColourHarmonicScale.js";
import { getColourOverTones } from "./colourSchemes/keyboardColourOvertones.js";
import { getColourGraduated, getColourGraduatedFreq, generateGradientArray } from "./colourSchemes/keyboardColourGraduated.js";
//import { getHSLCSSFromRatio } from "./colourSchemes/colourSelect.js"; 
import state from "./state.js";

const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";
const maxLoopSize = state.gridSize;

export function getFraction({ numerator, denominator }) {
  return numerator / denominator;
}

class Ratio {
  constructor({numerator, denominator, colours, column, row}) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.colours = colours || {}; 
    this.column = column;
    this.row = row;
    this.ratioString = `${numerator}/${denominator}`;
  }
  get fraction() {
    return this.calcFraction();
  }

  calcFraction() {
    return this.numerator / this.denominator;
  }

  setColours(colours) {
    this.colours = colours;
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
    // Colour Schemes
    const colorGradientArr = generateGradientArray();
    //const thisColourHSL = getColourGraduated(newRatio, colorGradientArr);
    const thisTonesColours = new KeyboardColourScheme({
      oct: getColourOctavesMatter(newRatio),
      mir: getColourMirrored(newRatio),
      //gra: getHSLCSSFromRatio(thisColourHSL),
      gra: getColourGraduatedFreq(newRatio),
      rhs: getColourHarmonicScale(newRatio),
      ovr: getColourOverTones(newRatio),
    });
    newRatio.setColours(thisTonesColours);
    thisArray.push(newRatio);
    numeratorCount += numeratorCountAmt;
    denominatorCount += denominatorCountAmt;
  }
  return thisArray.reverse();
}

const masterLamdomaSeq = createMasterLamdomaSeq(maxLoopSize);

export default masterLamdomaSeq;

console.log(masterLamdomaSeq);