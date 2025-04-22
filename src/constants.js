export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.5,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.002
};

export const NOTE_MAP = {
  "Unison": {
    name: "Unison",
    colour: "red",
    fraction: 1
  },
  "Perfect_Fifth": {
    name: "Perfect Fifth",
    colour: "yellow",
    fraction: 1.5
  },
  "Perfect_Fourth": {
    name: "Perfect Fourth",
    colour: "green",
    fraction: 1.333
  },
  "Major_Third": {
    name: "Major Third",
    colour: "blue",
    fraction: 1.25
  },
  "Minor_Third": {
    name: "Minor Third",
    colour: "indigo",
    fraction: 1.2
  },
  "Harmonic_Seventh": {
    name: "Harmonic Seventh",
    colour: "violet",
    fraction: 1.75
  },
  "Minor_Sixth": {
    name: "Minor Sixth",
    colour: "purple",
    fraction: 1.6
  },
  "Major_Second": {
    name: "PMajor Second",
    colour: "orange",
    fraction: 1.125
  },
  "Minor_Second": {
    name: "Minor Second",
    colour: "pink",
    fraction: 1.106
  },
};

export const GRID_SIZE = 8;