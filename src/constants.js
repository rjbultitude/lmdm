export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.5,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.002
};

export const CONSONANT_INTERVALS = {
  "1": {
    name: "Unison",
    colour: "red",
    fraction: 1.000
  },
  "1.5": {
    name: "Perfect Fifth",
    colour: "yellow",
    fraction: 1.500,
    subFraction: 1.666
  },
  "1.333": {
    name: "Perfect Fourth",
    colour: "green",
    fraction: 1.333
  },
  "1.25": {
    name: "Major Third",
    colour: "blue",
    fraction: 1.250,
    subFraction: 0.200
  },
  "1.2": {
    name: "Minor Third",
    colour: "indigo",
    fraction: 1.200,
    subFraction: 0.100
  },
  "1.75": {
    name: "Harmonic Seventh",
    colour: "violet",
    fraction: 1.750,
    subFraction: 0.142
  },
  "1.6": {
    name: "Minor Sixth",
    colour: "purple",
    fraction: 1.600
  },
  "1.125": {
    name: "PMajor Second",
    colour: "orange",
    fraction: 1.125,
    subFraction: 0.111
  },
  "1.106": {
    name: "Minor Second",
    colour: "pink",
    fraction: 1.106
  },
};

export const GRID_SIZE = 8;