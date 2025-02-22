import masterLamdomaSeq from "./createLambdomaSeq.js";
import { getNote } from "./noteFunctions.js";
import { AUDIO_CONFIG } from "./constants.js";
import { playNote } from "./audio.js";

const mainSection = document.getElementById("main");

export function addClickEvent(el, ratio) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    const thisNote = getNote({
      rootNote: AUDIO_CONFIG.ROOT_NOTE,
      ratio
    });
    playNote(thisNote);
    console.log("this fraction is ", ratio.fraction);
    console.log("this note is ", thisNote);
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
      thisButton.innerText = `${ratio.numerator}/${ratio.denominator}`;
      addClickEvent(thisButton, ratio);
      thisRow.insertAdjacentElement("afterbegin", thisButton);
    });
    mainSection.insertAdjacentElement("afterbegin", thisRow);
  });
}