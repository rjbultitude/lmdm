import { getNote } from "./noteFunctions.js";
import { ROOT_NOTE } from "./constants.js";

const twoOverThree = getNote({
  rootNote: ROOT_NOTE,
  row: 1,
  column: 2
});

console.log("twoOverThree", twoOverThree);