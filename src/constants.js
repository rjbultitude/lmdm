export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.5,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.02
};

export const KEYBOARD_COLOURSCHEME_OCT = "colourOctaves";
export const KEYBOARD_COLOURSCHEME_MIR = "colourMirrored";
export const KEYBOARD_COLOURSCHEME_GRA = "colourGraduated";
export const KEYBOARD_COLOURSCHEME_RHS = "colourHarmonicScale";
export const KEYBOARD_COLOURSCHEME_OVR = "colourOvertones";

export const ONE_SHOT = "One Shot";
export const RELEASE = "Release";
export const MIDI_NOTE_MIDDLE_C = 60;

export const GRID_SIZE = 8;
export const DEFAULT_COLOUR = "#cccccc";
export const KEYBOARD_BTN_CLASSNAME = "keyboard__button";

/* Option two 
   Interval names are ratios */
export const constantIntervalColours = {
  "1/1": "#d86a80", // unison
  "9/8": "#d2b534", // major second
  "16/15": "#e74fdf", // minor second
  "5/4": "#b062e4", // major third
  "6/5": "#6a75dd", // minor third
  "4/3": "#6cd9af", // perfect fourth
  "3/2": "#c2d951", // perfect fifth
  "5/3": "#bca1ed", // major sixth
  "8/5": "#9d71f0", // minor sixth
  "7/4": "#ca7efd", // harmonic seventh
  // Exception
  "2/9": "#65b4f8", // flat seventh. 16.9
}

export const constantIntervalOutlierColours = {
  "7/3": "#9e5de8", // diminished 6th
  "7/5": "#c1bf81", // lesser septimal tritone
  "9/7": "#9dc181", // septimal major third
  // Exception
  "1/7": "#6e9ad4", // Subharmic 7th
  "3/7": "#c8cfcc", // septimal minor third
  "5/7": "#c8cfcc", // Septimal Tritone
}

export const harmonicScaleRatiosToLetters = {
  "8/8": "P",
  "9/8": "Q",
  "10/8": "R",
  "11/8": "S",
  "12/8": "T",
  "13/8": "U",
  "14/8": "V",
  "15/8": "W"
}