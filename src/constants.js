export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.4,
  MIN_VOLUME: 0.02,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.2
};

export class KeyboardColourScheme {
  constructor({ oct, mir, gra, rhs, ovr, und }) {
    this.oct = oct;
    this.mir = mir;
    this.gra = gra;
    this.rhs = rhs;
    this.ovr = ovr;
    this.und = und;
  }
}

export const ONE_SHOT = "One Shot";
export const RELEASE = "Release";
export const MIDI_NOTE_MIDDLE_C = 60;

export const GRID_SIZE = 8;
export const DEFAULT_COLOUR = "#cccccc";

export const MAIN_El = document.getElementById("main");
export const KEYBOARD_BTN_CLASSNAME = "keyboard__button";

/* Option two 
   Interval names are ratios */
export const constantIntervalColours = {
  "1/1": "hsl(5.232558139534883,70%,70%)", // unison
  "9/8": "hsl(41.860465116279066,70%,70%)", // major second
  "16/15": "hsl(334.8837209302325,70%,70%)", // minor second
  "5/4": "hsl(293.0232558139535,70%,70%)", // major third
  "6/5": "hsl(209.30232558139537,70%,70%)", // minor third
  "4/3": "hsl(167.44186046511626,70%,70%)", // perfect fourth
  "3/2": "hsl(69.76744186046513,70%,70%)", // perfect fifth
  "5/3": "hsl(195.34883720930236,70%,70%)", // major sixth
  "8/5": "hsl(230.2325581395349,70%,70%)", // minor sixth
  "7/4": "hsl(293.0232558139535,70%,70%)", // harmonic seventh
  // Exception
  "2/9": "hsl(125.58139534883722,70%,70%)", // flat seventh. 16.9
}

export const constantIntervalOutlierColours = {
  "7/3": "hsl(313.95348837209303,70%,70%)", // diminished 6th
  "7/5": "hsl(58.604651162790695,70%,70%)", // lesser septimal tritone
  "9/7": "hsl(83.72093023255813,70%,70%)", // septimal major third
  // Exception
  "1/7": "hsl(181.3953488372093,70%,70%)", // Subharmic 7th
  "3/7": "hsl(20.930232558139533,70%,70%)", // septimal minor third
  "5/7": "hsl(46.51162790697675,70%,70%)", // Septimal Tritone
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