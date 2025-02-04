const numeration = "numeration";
const denomination = "denomination";
const ascendBoth = "ascendBoth";

function createLambdomaSequence(startingNumerator, startingDenominator, loopSize, type) {
  const lambdomaSequence = [];
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
    const thisFraction = numeratorCount / denominatorCount;
    lambdomaSequence.push(thisFraction);
    numeratorCount += numeratorCountAmt;
    denominatorCount += denominatorCountAmt;
    console.log("denominatorCount", denominatorCount);
    console.log("denominatorCountAmt", denominatorCountAmt);
  }
  return lambdomaSequence;
}

const lambdomaSequence = createLambdomaSequence(1, 1, 5, denomination);
console.log(lambdomaSequence);