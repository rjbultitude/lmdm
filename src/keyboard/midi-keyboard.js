import { MIDI_NOTE_MIDDLE_C, ONE_SHOT } from '../constants.js';
import state from '../state.js';
import { showToastEl } from '../ui/ui-utils.js';
import { UNLOCK_ID } from '../ui/unlock-toast.js';
import { TOAST_ERROR_ID, TOAST_TEXT_ERROR_ID, } from '../ui/error-toast.js';

// This should only be called on setGridSize
function getRange() {
  // assume always even
  const totalNumNotes = state.gridSize * state.gridSize;
  const midNote = totalNumNotes / 2;
  const lowestNote = MIDI_NOTE_MIDDLE_C - midNote;
  const highestNote = MIDI_NOTE_MIDDLE_C + midNote;
  return {
    lowestNote,
    highestNote
  }
}

// Offsets the centre note
export function offsetMIDIRange(note) {
  const notesRange = getRange()
  const rawNote = note;
  return rawNote - notesRange.lowestNote;
}

export function MIDIKeyInRange(offsetNote) {
  const highestNote = state.gridSize * state.gridSize;
  if (offsetNote < 1) {
    return false;
  }
  if (offsetNote > highestNote) {
    return false;
  }
  return true;
}

export function getVelocity(message) {
  // a velocity value might not be included with a noteOff command
  return message.data.length > 2 ? message.data[2] : 0;
}

export function onMIDIMessage(message) {
  const command = message.data[0];
  // Middle C is 60
  const note = message.data[1];
  const velocity = getVelocity(message);
  const offsetNote = offsetMIDIRange(note);
  // data number 1 (lowest note on lambdoma keyboard)
  const noteButton = document.querySelector(`[data-number='${offsetNote}']`);
  const noteInRange = MIDIKeyInRange(offsetNote);
  //const noteInRange = true;

  switch (command) {
    case 144: // noteOn
      if (velocity > 0 && noteInRange) {
        noteButton.click();
      }
      break;
    case 128: // noteOff
      if (noteInRange && state.playMode === ONE_SHOT) {
        noteButton.click();
      }
      break;
  }
}

export function onMIDISuccess(midiAccess) {
  if (state.audioContext.state !== "running") {
      showToastEl({ elID: UNLOCK_ID, txtID: "", msg: "" });
      return;
  }
  midiAccess.inputs.forEach(input => {
    input.onmidimessage = onMIDIMessage;
  });
  midiAccess.onstatechange = (e) => {
    if (e.port.type === "input" && e.port.state === "connected") {
      e.port.onmidimessage = onMIDIMessage;
    }
  };
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
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    state.MIDINotSupported = true;
    showToastEl({
      elID: TOAST_ERROR_ID,
      txtID: TOAST_TEXT_ERROR_ID,
      msg: 'WebMIDI is not supported in this browser.'
    });
  }
}
