/**
 * @fileoverview A collection of generative art utility functions
 *
 * @author victor@stakeordie.com (Victor Valle)
 */

/**
 * Pseudo-random number generation functions
 * Currently using working prototypes soon to be replaced with the final ones
 */

/**
 * Sets the seeds to be used by the pseudo-random number generator
 * @param string the string to be used as a seed
 */
let seed;
p5.prototype.pseudorandomSeed = function (string) {
  seed = parseInt(string.slice(2, 10), 16);
};

/**
 * Returns a pseudo-random number between the minimum and maximum (not inclusive),
 * if no parameters are passed then 0 and 1 are used as defaults
 * @param {number} min the minimum value in the range
 * @param {number} max the maximum value in the range (not inclusive)
 * @return {number} a pseudo-random decimal number
 */
p5.prototype.pseudorandom = function (min = 0, max = 1) {
  /* Algorithm "xor" from p. 4 of Marsaglia, "Xorshift RNGs" */
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  const result = ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000;

  return min + (max - min) * result;
};

p5.prototype.pseudorandomInteger = function (a, b) {
  return Math.floor(this.pseudorandom(a, b + 1));
};
p5.prototype.pseudorandomIntegers = function (n, a, b) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(this.pseudorandomInteger(a, b));
  }
  return result;
};

p5.prototype.pseudorandomBoolean = function (p) {
  return this.pseudorandom() < p;
};

p5.prototype.pseudorandomPick = function (list) {
  return list[Math.floor(this.pseudorandom(0, list.length * 0.99))];
};

let lastPickedOption;
p5.prototype.pseudorandomPickDifferent = function (list) {
  if (list.length == 0) {
    return;
  }
  if (list.length == 1) {
    return list[0];
  }
  let pickedOption;
  do {
    pickedOption = this.pseudorandomPick(list);
  } while (lastPickedOption == pickedOption);
  return (lastPickedOption = pickedOption);
};


/**
 * Dimensionless functions
 */
const DEFAULT_SIZE  = 1000;

let k;

p5.prototype.dimensionlessCanvas = function (width, height) {
    const canvasWidth = width || DEFAULT_SIZE;
    const canvasHeight = height || width || DEFAULT_SIZE;
    k = Math.min(canvasWidth, canvasHeight) * DEFAULT_SIZE;
    return this.createCanvas(canvasWidth, canvasHeight);
};

p5.prototype.dimensionless = function (x) {
    return x * k / DEFAULT_SIZE;
}