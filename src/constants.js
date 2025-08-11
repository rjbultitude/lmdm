export const AUDIO_CONFIG = {
  ROOT_NOTE: 256,
  MAX_VOLUME: 0.5,
  WAVE_TYPE: "sine",
  MAX_NUM_OSC: 4,
  SMOOTHING_INTERVAL: 0.02
};

export const GRID_SIZE = 9;

/* Option one 
   Interval names are the keys */
export class ConstantIntervalRatios {
  getSubHarmonicRatio(key) {
    return this.constantIntervalRatiosObj[key].split("/").reverse().join();
  }
  unison = {
    harmonicRatio: "1/1",
    colour: "red",
  }
  majorSecond = {
    harmonicRatio: "9/1",
    colour: "orange",
  }
  minorSecond = {
    harmonicRatio: "16/15",
    colour: "pink",
  }
  majorThird = {
    harmonicRatio: "5/4",
    colour: "indigo",
  }
  minorThird = {
    harmonicRatio: "6/5",
    colour: "",
  }
  perfectForth = {
    harmonicRatio: "4/3",
    colour: "green",
  }
  perfectFifth = {
    harmonicRatio: "3/2",
    colour: "yellow",
  }
  majorSixth = {
    harmonicRatio: "5/3",
    colour: "",
  }
  minorSixth = {
    harmonicRatio: "8/5",
    colour: "purple",
  }
  harmonicSeventh = {
    harmonicRatio: "7/4",
    colour: "violet",
  }
  flatSeventh = {
    harmonicRatio: "16/9",
    colour: "",
  }
}

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
  "5/3": "light purple", // majorSixth
  "8/5": "purple", // minor Sixth
  "7/4": "violet", // harmonic seventh
  "16/9": "lilac", // flat seventh
}

/* Option three 
   Interval names are the (calculated) fraction */
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
    subFraction: 0.333 // 1/3
  },
  "1.333": {
    name: "Perfect Fourth",
    colour: "green",
    fraction: 1.333,
    subFraction: 3/4
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
    subFraction: 0.143 // 1/7
  },
  "1.6": {
    name: "Minor Sixth",
    colour: "purple",
    fraction: 1.600,
    subFraction: 0.078 // 5/8
  },
  "1.125": {
    name: "Major Second",
    colour: "orange",
    fraction: 1.125,
    subFraction: 0.111 // 1/9
  },
  "1.106": {
    name: "Minor Second",
    colour: "pink",
    fraction: 1.106,
    subFraction: 0.9375 // 15/16
  },
};