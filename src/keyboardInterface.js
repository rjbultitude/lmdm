import masterLamdomaSeq from "./createLambdomaSeq.js";
import { getNote } from "./noteFunctions.js";
import { AUDIO_CONFIG } from "./constants.js";
import { playNote, stopNote } from "./audio.js";

const mainSection = document.getElementById("main");
let playing = false;

export function addClickEvent(el, ratio) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    const noteId = e.target.id;
    const playingString = e.target.dataset.playing;
    const playing = (playingString === "true");
    if (playing === false) {
      const thisFreq = getNote({
        rootNote: AUDIO_CONFIG.ROOT_NOTE,
        ratio
      });
      playNote(noteId, thisFreq);
      e.target.dataset.playing = true;
      console.log("this fraction is ", ratio.fraction);
      console.log("this note is ", thisFreq);
      return;
    }
    stopNote(noteId);
    e.target.dataset.playing = false;
  }, false);
}

export function createColumns() {
  masterLamdomaSeq.forEach((column, index) => {
    const thisRow = document.createElement("div");
    thisRow.setAttribute("id", `column-${index}`);
    thisRow.setAttribute("class", "keyboard__column");
    // Buttons
    column.forEach((ratio) => {
      const thisButton = document.createElement("button");
      thisButton.setAttribute("id", `${ratio.numerator}-${ratio.denominator}`);
      thisButton.setAttribute("class", "keyboard__button");
      thisButton.setAttribute("data-playing", "false");
      thisButton.innerText = `${ratio.numerator}/${ratio.denominator}`;
      addClickEvent(thisButton, ratio);
      thisRow.insertAdjacentElement("afterbegin", thisButton);
    });
    mainSection.insertAdjacentElement("afterbegin", thisRow);
  });
}