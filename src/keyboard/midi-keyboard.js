import { MIDI_NOTE_MIDDLE_C, ONE_SHOT } from '../constants.js';
import state from '../state.js';

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

  switch (command) {
    case 144: // noteOn
      if (velocity > 0 && MIDIKeyInRange(thisNote)) {
        console.debug("thisNote", thisNote);
        //clickButton(thisNote, play);
      }
      break;
    case 128: // noteOff
      if (MIDIKeyInRange(thisNote) && state.playMode === ONE_SHOT) {
        //clickButton(thisNote, stop);
      }
      break;
  }
}

export function onMIDISuccess(
  midiAccess,
  _getMIDIMessage = getMIDIMessage
) {
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = (message) => {
      _getMIDIMessage(message);
    };
  }
  return midiAccess;
}

export function onMIDIFailure() {
  console.warn('Could not access your MIDI devices.');
}

export function initMIDIAccess() {
  if (navigator.requestMIDIAccess) {
    state.MIDINotSupported = false;
    navigator.requestMIDIAccess().then((midiAccess) => {
      onMIDISuccess(midiAccess);
    }, onMIDIFailure);
  } else {
    state.MIDINotSupported = true;
    console.warn('WebMIDI is not supported in this browser.');
  }
}
