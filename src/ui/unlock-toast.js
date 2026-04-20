import state from '../state.js';
import { hideToastEl } from './ui-utils.js';

export const UNLOCK_ID = "unlock-midi-toast";
const ACTIVE = "active";

export function initUnlockMidi() {
  const unlockEl = document.createElement('aside');
  unlockEl.className = 'toast-wrapper';
  unlockEl.id = UNLOCK_ID;
  // Text
  const toastText = document.createElement('p');
  toastText.innerText = "You need to unlock WebAudio for the browser to accept MIDI";
  // Close
  const toastClose = document.createElement('button');
  toastClose.id = "toast-close";
  toastClose.className = "dialog__close";
  toastClose.innerText = "Unlock MIDI";
  toastClose.addEventListener("click", function(e) {
    state.audioContext.resume().then(() => {
      document.getElementById("unlock").style.display = "none";
      hideToastEl(e);
    });
  });
  unlockEl.insertAdjacentElement("afterbegin", toastText);
  unlockEl.insertAdjacentElement("afterbegin", toastClose);
  document.body.insertAdjacentElement("beforeend", unlockEl);
}
