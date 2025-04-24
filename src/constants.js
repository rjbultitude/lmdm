export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.5,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.002
};

export const NOTE_MAP = {
  "1": {
    name: "Unison",
    colour: "red",
    fraction: 1
  },
  "1.5": {
    name: "Perfect Fifth",
    colour: "yellow",
    fraction: 1.5
  },
  "1.333": {
    name: "Perfect Fourth",
    colour: "green",
    fraction: 1.333
  },
  "1.25": {
    name: "Major Third",
    colour: "blue",
    fraction: 1.25
  },
  "1.2": {
    name: "Minor Third",
    colour: "indigo",
    fraction: 1.2
  },
  "1.75": {
    name: "Harmonic Seventh",
    colour: "violet",
    fraction: 1.75
  },
  "1.6": {
    name: "Minor Sixth",
    colour: "purple",
    fraction: 1.6
  },
  "1.125": {
    name: "PMajor Second",
    colour: "orange",
    fraction: 1.125
  },
  "1.106": {
    name: "Minor Second",
    colour: "pink",
    fraction: 1.106
  },
};

export const GRID_SIZE = 8;