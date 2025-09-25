import masterLamdomaSeq, { createMasterLamdomaSeq } from "./createLambdomaSeq.js";
import { getNote } from "./noteFunctions.js";
import state from "./state.js";
import { playNote, stopNote } from "./audio.js";
import { KEYBOARD_BTN_CLASSNAME } from "./constants.js";
import { initColourSelect } from "./colourSelect.js";

const mainSection = document.getElementById("main");

export function noteBtnAddClickEvent(el, ratio) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    const noteId = e.target.id;
    const playingString = e.target.dataset.playing;
    const playing = (playingString === "true");
    if (playing === false) {
      const thisFreq = getNote({
        rootNote: state.baseFrequency,
        ratio
      });
      playNote(noteId, thisFreq);
      e.target.dataset.playing = "true";
      state.activeVoices[noteId].ratio = ratio;
      console.log("this fraction is ", ratio.fraction);
      console.log("this note is ", thisFreq);
      console.log("state.activeVoices", state.activeVoices);
      return;
    }
    stopNote(noteId);
    e.target.dataset.playing = "false";
  }, false);
}

export function resetPlaying(noteId) {
  const playingButton = document.getElementById(noteId);
  playingButton.dataset.playing = "false";
}

export function recreateColumns() {
  mainSection.replaceChildren();
  const doneCallbackArr = [initColourSelect];
  const entireLambdoma = createMasterLamdomaSeq(state.gridSize);
  state.entireLambdoma = entireLambdoma;
  createColumns(doneCallbackArr, entireLambdoma);
}

export function createColumns(readyCallbacksArr, entireLambdoma = masterLamdomaSeq) {
  entireLambdoma.forEach((column, index) => {
    const thisRow = document.createElement("div");
    thisRow.setAttribute("id", `column-${index}`);
    thisRow.setAttribute("class", "keyboard__column");
    // Buttons
    column.forEach((ratio) => {
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
      thisButton.setAttribute("id", `${ratio.numerator}-${ratio.denominator}`);
      //thisButton.setAttribute("class", `${KEYBOARD_BTN_CLASSNAME} ${ratio.colour}`);
      thisButton.setAttribute("class", `${KEYBOARD_BTN_CLASSNAME}`);
      thisButton.style.backgroundColor = ratio.colourHSL;
      thisButton.setAttribute("data-playing", "false");
      thisButton.insertAdjacentElement("afterbegin", thisTextWrapper);
      noteBtnAddClickEvent(thisButton, ratio);
      thisRow.insertAdjacentElement("afterbegin", thisButton);
    });
    mainSection.insertAdjacentElement("afterbegin", thisRow);
  });
  readyCallbacksArr.forEach((cb) => {
    cb();
  });
  return entireLambdoma;
}