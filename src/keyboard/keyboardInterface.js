import masterLamdomaSeq, { createMasterLamdomaSeq } from "../createLambdomaSeq.js";
import { getNote } from "../audio/noteFunctions.js";
import state from "../state.js";
import { playNote, stopNote } from "../audio/audio.js";
import { MAIN_El, KEYBOARD_BTN_CLASSNAME } from "../constants.js";

//const noteNameEl = document.getElementById("note-data-notename");
const noteFreqEl = document.getElementById("note-data-freq");
const noteNumberEl = document.getElementById("note-data-num");
let animationInterval;

export function animateKeyboardButtons() {
  const keyboardBtns = document.querySelectorAll(".keyboard__button");
  keyboardBtns.forEach((thisButton, index) => {
    thisButton.classList.add("btn__flash");
    setTimeout(() => {
      thisButton.classList.remove("btn__flash");
    }, 20 * index);
  });
}

export function setKeyboardAnimationInterval() {
  animationInterval = setInterval(() => {
    if (!state.isPlaying) {
      animateKeyboardButtons();
    }
  }, 30000);
}

export function clearKeyboardAnimationInterval() {
  clearInterval(animationInterval);
}

function updateNoteDataUi(thisFreq) {
  //noteNameEl.innerText = "A";
  if (!!thisFreq) {
    noteFreqEl.innerText = thisFreq.toFixed(2);
  }
  noteNumberEl.innerText = state.voiceManager.activeVoices.size;
}

export function clearNoteDataUi() {
  //noteNameEl.innerText = "";
  noteFreqEl.innerText = "";
}

export function noteBtnAddClickEvent(el, ratio) {
  el.addEventListener("click", function (e) {
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
      playNote(noteId, thisFreq, ratio);
      e.target.dataset.playing = "true";
      updateNoteDataUi(thisFreq);
      return;
    }
    // STOP
    stopNote(noteId);
    e.target.dataset.playing = "false";
    updateNoteDataUi();
    clearNoteDataUi();
  }, false);
}

export function resetPlaying(noteId) {
  const playingButton = document.getElementById(noteId);
  playingButton.dataset.playing = "false";
}

export function recreateColumns() {
  MAIN_El.replaceChildren();
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
      thisTextWrapper.classList.add(`${KEYBOARD_BTN_CLASSNAME}__text`);
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
      thisButton.classList.add(KEYBOARD_BTN_CLASSNAME);
      thisButton.style.setProperty('--button-color', thisButton.dataset[state.colourScheme]);
      thisButton.setAttribute("data-playing", "false");
      thisButton.insertAdjacentElement("afterbegin", thisTextWrapper);
      // thisButton.classList.add("btn__flash");
      // setTimeout(() => {
      //   thisButton.classList.remove("btn__flash");
      // }, 20 * rowIndex);
      noteBtnAddClickEvent(thisButton, ratio);
      thisRow.insertAdjacentElement("afterbegin", thisButton);
    });
    MAIN_El.insertAdjacentElement("afterbegin", thisRow);
  });
  return entireLambdoma;
}