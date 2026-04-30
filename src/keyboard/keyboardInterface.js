import masterLamdomaSeq, { createMasterLamdomaSeq } from "../createLambdomaSeq.js";
import { getNote } from "../audio/noteFunctions.js";
import state from "../state.js";
import { playNote, stopNote } from "../audio/audio.js";
import { KEYBOARD_BTN_CLASSNAME } from "../constants.js";

const mainSection = document.getElementById("main");
//const noteNameEl = document.getElementById("note-data-notename");
const noteFreqEl = document.getElementById("note-data-freq");
const noteNumberEl = document.getElementById("note-data-num");

function updateNoteDataUi(thisFreq) {
  //noteNameEl.innerText = "A";
  noteFreqEl.innerText = thisFreq.toFixed(2);
  noteNumberEl.innerText = Object.keys(state.activeVoices).length;
}

export function clearNoteDataUi() {
  //noteNameEl.innerText = "";
  noteFreqEl.innerText = "";
  noteNumberEl.innerText = "";
}

export function noteBtnAddClickEvent(el, ratio) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    const noteId = e.target.id;
    const playingString = e.target.dataset.playing;
    // coerce to boolean
    const playing = (playingString === "true");
    const thisFreq = getNote({
      rootNote: state.baseFrequency,
      ratio
    });
    if (playing === false) {
      // PLAY
      playNote(noteId, thisFreq);
      e.target.dataset.playing = "true";
      state.activeVoices[noteId].ratio = ratio;
      updateNoteDataUi(thisFreq);
      return;
    }
    // STOP
    stopNote(noteId, thisFreq);
    e.target.dataset.playing = "false";
    clearNoteDataUi();
  }, false);
}

export function resetPlaying(noteId) {
  const playingButton = document.getElementById(noteId);
  playingButton.dataset.playing = "false";
}

export function recreateColumns() {
  mainSection.replaceChildren();
  const entireLambdoma = createMasterLamdomaSeq(state.gridSize);
  state.entireLambdoma = entireLambdoma;
  createColumns(entireLambdoma);
}

export function createColumns(entireLambdoma = masterLamdomaSeq) {
  const totalGridCount = state.gridSize * state.gridSize;
  let lastTotal = totalGridCount;
  entireLambdoma.forEach((column, index) => {
    const thisRow = document.createElement("div");
    thisRow.setAttribute("id", `column-${index}`);
    thisRow.setAttribute("class", "keyboard__column");
    lastTotal = totalGridCount - (index * entireLambdoma.length);
    // Buttons
    column.forEach((ratio, rowIndex) => {
      const thisButton = document.createElement("button");
      const thisTextWrapper = document.createElement("div");
      thisTextWrapper.setAttribute("class", `${KEYBOARD_BTN_CLASSNAME}__text`);
      const ratiostr = `${ratio.numerator}/${ratio.denominator}`;
      thisTextWrapper.innerText = ratiostr;
      // set button data state
      thisButton.dataset.ratioString = ratiostr;
      thisButton.dataset.numerator = ratio.numerator;
      thisButton.dataset.denominator = ratio.denominator;
      thisButton.dataset.row = ratio.row;
      thisButton.dataset.column = ratio.column;
      thisButton.dataset.number = lastTotal - ratio.row;
      // colour scheme
      Object.keys(ratio.colours).forEach((colourSchemeKey) => {
        thisButton.dataset[colourSchemeKey] = ratio.colours[colourSchemeKey];
      });
      // standard attributes
      thisButton.setAttribute("id", `${ratio.numerator}-${ratio.denominator}`);
      thisButton.setAttribute("class", `${KEYBOARD_BTN_CLASSNAME}`);
      thisButton.style.setProperty('--button-color', thisButton.dataset[state.colourScheme]);
      thisButton.setAttribute("data-playing", "false");
      thisButton.insertAdjacentElement("afterbegin", thisTextWrapper);
      noteBtnAddClickEvent(thisButton, ratio);
      thisRow.insertAdjacentElement("afterbegin", thisButton);
    });
    mainSection.insertAdjacentElement("afterbegin", thisRow);
  });
  return entireLambdoma;
}