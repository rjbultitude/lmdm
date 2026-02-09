import { 
  KeyboardColourScheme,
  KEYBOARD_BTN_CLASSNAME 
} from "../constants.js";

import state from "../state.js";

// Initialise colour schemes
const KEYBOARD_COLOURSCHEME = new KeyboardColourScheme({
  "oct": "Octaves",
  "mir": "Mirrored",
  "gra": "Graduated",
  "rhs": "Harmonic Scale",
  "ovr": "Overtones",
});

export function getHSLCSSFromRatio(thisColourHSL) {
  return `hsl(${thisColourHSL.hue},${thisColourHSL.saturation}%,${thisColourHSL.lightness}%)`;
}

export function setNewButtonColour({ keyboardBtn, colourSchemeName, colour }) {
  keyboardBtn.className = "";
  keyboardBtn.style.backgroundColor = "";
  keyboardBtn.classList.add(KEYBOARD_BTN_CLASSNAME);
  if (colourSchemeName === KEYBOARD_COLOURSCHEME.gra) {
    const hslColour = getHSLCSSFromRatio(colour);
    keyboardBtn.style.setProperty('--button-color', hslColour);
    return;
  }
  keyboardBtn.classList.add(colour);
}

function updateColours(selectedColourOption, allKeyboardBtns) {
  allKeyboardBtns.forEach((keyboardBtn) => {
    const selectedColourOptionDataSet = keyboardBtn.dataset[selectedColourOption];
    keyboardBtn.style.setProperty('--button-color', selectedColourOptionDataSet);
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
  colourSelect.replaceChildren();
  Object.keys(KEYBOARD_COLOURSCHEME).forEach((colourOptionKey) => {
    const colourOptionEl = document.createElement("option");
    colourOptionEl.value = colourOptionKey;
    console.debug("KEYBOARD_COLOURSCHEME", KEYBOARD_COLOURSCHEME);
    console.debug("KEYBOARD_COLOURSCHEME[colourOptionKey]", KEYBOARD_COLOURSCHEME[colourOptionKey]);
    colourOptionEl.innerText = KEYBOARD_COLOURSCHEME[colourOptionKey];
    colourSelect.insertAdjacentElement("afterbegin", colourOptionEl);
  });
  colourSelect.value = state.colourScheme;
  colourSelect.addEventListener("change", function(e) {
    const selectedColourOption = e.target.value;
    state.colourScheme = selectedColourOption;
    const allKeyboardBtns = getAllKeyboardBtns();
    updateColours(selectedColourOption, allKeyboardBtns);
  });
  return colourSelect;
}