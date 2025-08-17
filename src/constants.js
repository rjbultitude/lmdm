export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.5,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.02
};

export const GRID_SIZE = 9;

/* Option two 
   Interval names are ratios */
export const constantIntervalColours = {
  "1/1": "red", // unison
  "9/8": "orange", // major second
  "16/15": "pink", // minor second
  "5/4": "indigo", // major third
  "6/5": "blue", // minor third
  "4/3": "green", // perfect fourth
  "3/2": "yellow", // perfect fifth
  "5/3": "light_purple", // major sixth
  "8/5": "purple", // minor sixth
  "7/4": "violet", // harmonic seventh
  "2/9": "lilac", // flat seventh. 16.9
  "7/3": "deep_purple", // diminished 6th
  "7/5": "beige", // lesser septimal tritone
  "9/7": "grass", // septimal major third
  "1/7": "pale_blue" // Subharmic 7th
}