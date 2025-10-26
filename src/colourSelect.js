import { getColourMirrored } from "./keyboardColourMirrored.js";
import { getColourOctavesMatter } from "./keyboardColourOctavesMatter.js";
import { KEYBOARD_COLOURSCHEME_OCT, KEYBOARD_COLOURSCHEME_MIR, KEYBOARD_COLOURSCHEME_GRA, KEYBOARD_BTN_CLASSNAME } from "./constants.js";
import { getColourGraduated } from "./keyboardColourGraduated.js";
import state from "./state.js";
const colourOptions = [KEYBOARD_COLOURSCHEME_OCT, KEYBOARD_COLOURSCHEME_MIR, KEYBOARD_COLOURSCHEME_GRA];

export function getHSLCSSFromRatio(thisColourHSL) {
  return `hsl(${thisColourHSL.hue},${thisColourHSL.saturation}%,${thisColourHSL.lightness}%)`;
}

export function setNewButtonColour({ keyboardBtn, colourSchemeName, colour }) {
  keyboardBtn.className = "";
  keyboardBtn.style.backgroundColor = "";
  keyboardBtn.classList.add(KEYBOARD_BTN_CLASSNAME);
  if (colourSchemeName === KEYBOARD_COLOURSCHEME_GRA) {
    const hslColour = getHSLCSSFromRatio(colour);
    //keyboardBtn.style.backgroundColor = hslColour;
    keyboardBtn.style.setProperty('--button-color', hslColour);
    return;
  }
  keyboardBtn.classList.add(colour);
}

function updateColours(selectedColourOption, allKeyboardBtns) {
  allKeyboardBtns.forEach((keyboardBtn) => {
    // get button data state
    const btnRatio = keyboardBtn.dataset.ratioString;
    const btnDenominator = keyboardBtn.dataset.denominator;
    const btnNumerator = keyboardBtn.dataset.numerator;
    const btnRow = keyboardBtn.dataset.row;
    const btnColumn = keyboardBtn.dataset.column;
    // create new ratio object
    const ratio = {
      ratioString: btnRatio,
      denominator: btnDenominator,
      numerator: btnNumerator,
      row: btnRow,
      column: btnColumn,
    };
    let colour;
    switch (selectedColourOption) {
      case KEYBOARD_COLOURSCHEME_OCT:
        colour = getColourOctavesMatter(ratio);
        setNewButtonColour({ keyboardBtn, colourSchemeName: KEYBOARD_COLOURSCHEME_OCT, colour });
        state.colourScheme = KEYBOARD_COLOURSCHEME_OCT;
        break;
      case KEYBOARD_COLOURSCHEME_MIR:
        colour = getColourMirrored(ratio);
        setNewButtonColour({ keyboardBtn, colourSchemeName: KEYBOARD_COLOURSCHEME_MIR, colour });
        state.colourScheme = KEYBOARD_COLOURSCHEME_MIR;
        break;
      case KEYBOARD_COLOURSCHEME_GRA:
        colour = getColourGraduated(ratio);
        setNewButtonColour({ keyboardBtn, colourSchemeName: KEYBOARD_COLOURSCHEME_GRA, colour });
        state.colourScheme = KEYBOARD_COLOURSCHEME_GRA;
        break;
      default:
        colour = getColourOctavesMatter(ratio);
        setNewButtonColour({ keyboardBtn, colourSchemeName: state.colourScheme, colour });
        break;
    }
  });
}

export function getAllKeyboardBtns() {
  let allKeyboardBtns = [];
  const keyboard = document.getElementById("main");
  const keyboardColumns = Array.from(keyboard.children);
  keyboardColumns.forEach((keyboardCol) => {
    const keyboardColArr = Array.from(keyboardCol.children);
    keyboardColArr.forEach((childNode) => {
      allKeyboardBtns.push(childNode);
    });
  });
  return allKeyboardBtns;
}

export function initColourSelect() {
  const colourSelect = document.getElementById("keyboard-colours-select");
  colourSelect.value = state.colourScheme;
  const allKeyboardBtns = getAllKeyboardBtns();
  colourSelect.replaceChildren();
  colourOptions.forEach((colourOption) => {
    const colourOptionEl = document.createElement("option");
    colourOptionEl.value = colourOption;
    colourOptionEl.innerText = colourOption;
    colourSelect.insertAdjacentElement("afterbegin", colourOptionEl);
  });
  colourSelect.value = state.colourScheme;
  colourSelect.addEventListener("change", function(e) {
    const selectedColourOption = e.target.value;
    updateColours(selectedColourOption, allKeyboardBtns);
  });
  return colourSelect;
}