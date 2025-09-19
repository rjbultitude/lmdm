import { getColourMirrored } from "./keyboardColourMirrored.js";
import { getColourOctavesMatter } from "./keyboardColourOctavesMatter.js";
import { KEYBOARD_COLOURSCHEME_OCT, KEYBOARD_COLOURSCHEME_MIR, KEYBOARD_BTN_CLASSNAME } from "./constants.js";
const colourOptions = [KEYBOARD_COLOURSCHEME_OCT, KEYBOARD_COLOURSCHEME_MIR];

function updateColours(selectedColourOption, allKeyboardBtns) {
  allKeyboardBtns.forEach((keyboardBtn) => {
    const btnRatio = keyboardBtn.dataset.ratioString;
    const btnDenominator = keyboardBtn.dataset.denominator;
    const btnNumerator = keyboardBtn.dataset.numerator;
    const ratio = {
      ratioString: btnRatio,
      denominator: btnDenominator,
      numerator: btnNumerator,
    };
    let colour;
    switch (selectedColourOption) {
      case KEYBOARD_COLOURSCHEME_OCT:
        colour = getColourOctavesMatter(ratio);
        break;
      case KEYBOARD_COLOURSCHEME_MIR:
        colour = getColourMirrored(ratio);
        break;
      default:
        colour = getColourOctavesMatter(ratio);
        break;
    }
    keyboardBtn.className = "";
    keyboardBtn.classList.add(KEYBOARD_BTN_CLASSNAME);
    keyboardBtn.classList.add(colour);
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
  const allKeyboardBtns = getAllKeyboardBtns();
  colourOptions.forEach((colourOption) => {
    const colourOptionEl = document.createElement("option");
    colourOptionEl.value = colourOption;
    colourOptionEl.innerText = colourOption;
    colourSelect.insertAdjacentElement("afterbegin", colourOptionEl);
  });
  colourSelect.addEventListener("change", function(e) {
    const selectedColourOption = e.target.value;
    updateColours(selectedColourOption, allKeyboardBtns);
  });
  return colourSelect;
}