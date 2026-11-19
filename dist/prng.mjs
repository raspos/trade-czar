// prng.mjs - Mulberry32 deterministic pseudo-random number generator

export class PRNG {
  constructor(seed = 123456789) {
    this.initialSeed = typeof seed === 'number' ? seed : PRNG.hashString(String(seed));
    this.state = this.initialSeed;
  }

  static hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash >>> 0;
  }

  // Returns float [0, 1)
  next() {
    let t = (this.state += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Returns float [min, max)
  range(min, max) {
    return min + (max - min) * this.next();
  }

  // Returns int [min, max] inclusive
  rangeInt(min, max) {
    return Math.floor(min + (max - min + 1) * this.next());
  }

  // Pick random element
  choice(array) {
    if (!array || array.length === 0) return null;
    return array[this.rangeInt(0, array.length - 1)];
  }

  // Return state for serializing save games
  getState() {
    return {
      initialSeed: this.initialSeed,
      state: this.state
    };
  }

  // Restore state
  setState(saved) {
    this.initialSeed = saved.initialSeed;
    this.state = saved.state;
  }
}
