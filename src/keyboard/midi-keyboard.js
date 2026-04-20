import { MIDI_NOTE_MIDDLE_C, ONE_SHOT } from '../constants.js';
import state from '../state.js';
import { showToastEl } from '../ui/ui-utils.js';
import { UNLOCK_ID } from '../ui/unlock-toast.js'
import { TOAST_ERROR_ID, TOAST_TEXT_ERROR_ID, } from '../ui/error-toast.js'

export function offsetMIDIRange(note) {
  return Math.abs(state.intervalsRange.lower) + note - MIDI_NOTE_MIDDLE_C;
}

export function MIDIKeyInRange(note) {
  const lowestNoteAbs = Math.abs(state.intervalsRange.lower);
  const highestNote = lowestNoteAbs + state.intervalsRange.upper;
  if (note < 0) {
    return false;
  }
  if (note > highestNote) {
    return false;
  }
  return true;
}

export function getVelocity(message) {
  // a velocity value might not be included with a noteOff command
  return message.data.length > 2 ? message.data[2] : 0;
}

export function getMIDIMessage(message) {
  const command = message.data[0];
  const note = message.data[1];
  const velocity = getVelocity(message);
  const thisNote = offsetMIDIRange(note);
  const noteButton = document.querySelector(`[data-number='${thisNote}']`);

  switch (command) {
    case 144: // noteOn
      if (velocity > 0 && MIDIKeyInRange(thisNote)) {
        noteButton.click();
      }
      break;
    case 128: // noteOff
      if (MIDIKeyInRange(thisNote) && state.playMode === ONE_SHOT) {
        noteButton.click();
      }
      break;
  }
}

export function onMIDISuccess(
  midiAccess,
  _getMIDIMessage = getMIDIMessage
) {
  if (state.audioContext.state !== "running") {
      showToastEl({ elID: UNLOCK_ID, txtID: "", msg: "" });
      return;
  }
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = (message) => {
      _getMIDIMessage(message);
    };
  }
  return midiAccess;
}

export function onMIDIFailure() {
  showToastEl({
    elID: TOAST_ERROR_ID,
    txtID: TOAST_TEXT_ERROR_ID,
    msg: 'Could not access your MIDI devices.'
  });
}

export function initMIDIAccess() {
  if (navigator.requestMIDIAccess) {
    state.MIDINotSupported = false;
    navigator.requestMIDIAccess().then((midiAccess) => {
      onMIDISuccess(midiAccess);
    }, onMIDIFailure);
  } else {
    state.MIDINotSupported = true;
    showToastEl({
      elID: TOAST_ERROR_ID,
      txtID: TOAST_TEXT_ERROR_ID,
      msg: 'WebMIDI is not supported in this browser.'
    });
  }
}
