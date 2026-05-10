import state from '../state.js';
import { hideToastEl } from './ui-utils.js';

export const UNLOCK_ID = "unlock-audio-toast";
export const UNLOCK_TOAST_CLOSE_BTN_ID = "unlock-toast-close";

export default function initUnlockAudio() {
  const unlockEl = document.createElement("aside");
  unlockEl.className = "toast-wrapper";
  unlockEl.id = UNLOCK_ID;
  // Text
  const toastText = document.createElement('p');
  toastText.innerText = "You need to unlock WebAudio for the browser to accept MIDI";
  // Close
  const toastClose = document.createElement('button');
  toastClose.id = UNLOCK_TOAST_CLOSE_BTN_ID;
  toastClose.className = "dialog__close";
  toastClose.innerText = "Unlock Audio";
  toastClose.addEventListener("click", function(e) {
    state.audioContext.resume()
      .then(() => {
        document.getElementById(UNLOCK_ID).style.display = "none";
        hideToastEl(e);
      })
      .catch((e) => {
        console.warn("Audio Context could not resume", e);
      });
  });
  unlockEl.insertAdjacentElement("afterbegin", toastText);
  unlockEl.insertAdjacentElement("afterbegin", toastClose);
  document.body.insertAdjacentElement("beforeend", unlockEl);
}
