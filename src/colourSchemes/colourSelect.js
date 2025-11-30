import { KEYBOARD_COLOURSCHEME_OCT, KEYBOARD_COLOURSCHEME_MIR, KEYBOARD_COLOURSCHEME_GRA, KEYBOARD_BTN_CLASSNAME } from "../constants.js";
import state from "../state.js";
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
    keyboardBtn.style.setProperty('--button-color', hslColour);
    return;
  }
  keyboardBtn.classList.add(colour);
}

function updateColours(selectedColourOption, allKeyboardBtns) {
  allKeyboardBtns.forEach((keyboardBtn) => {
    keyboardBtn.style.setProperty('--button-color', keyboardBtn.dataset[selectedColourOption]);
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