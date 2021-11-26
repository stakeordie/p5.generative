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
 
 /**
  * Returns a pseudo-random integer between the range specified
  * by minimum and maximum parameters
  * @param {number} min the minimum value in the range
  * @param {number} max the maximum value in the range
  * @returns {number} a pseudo-random integer between the specified range
  */
 p5.prototype.pseudorandomInteger = function (min, max) {
   return Math.floor(this.pseudorandom(min, max + 1));
 };

 /**
  * Returns an array filled with n items of pseudo-random 
  * integers between the range specified
  * @param {number} n the number of integers to be returned
  * @param {number} min the minimum value in the range
  * @param {number} max the maximum value in the range
  * @returns {array} an array containing n pseudo-random integers between 
  * the specified range
  */
 p5.prototype.pseudorandomIntegers = function (n, min, max) {
   const result = [];
   for (let i = 0; i < n; i++) {
     result.push(this.pseudorandomInteger(min, max));
   }
   return result;
 };
 
 p5.prototype.pseudorandomBoolean = function () {
   return this.pseudorandom() < 0.5;
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
 
 /**
  * Creates a canvas with the specified dimensions while initializing
  * the constant used to translate points from a normalized plane to 
  * the dimensionless canvas
  * @param {number} width the width of the canvas to be created
  * @param {number} height the height of the canvas to be created
  */
 p5.prototype.dimensionlessCanvas = function (width, height) {
     const canvasWidth = width || DEFAULT_SIZE;
     const canvasHeight = height || width || DEFAULT_SIZE;
     k = Math.min(canvasWidth, canvasHeight) * DEFAULT_SIZE;
     this.createCanvas(canvasWidth, canvasHeight);
 };
 
/**
  * Translates a normalized value into its value in the
  * dimensionless canvas
  * @param {number} x the normalized value to be translated
  * @returns the translated value  
  */
 p5.prototype.dimensionless = function (x) {
     return x * k / DEFAULT_SIZE;
 }


/**
 * 
 * @param {*} projectNumber 
 * @returns 
 */


/**
 * Function that emulates the generation of a "true" rantom test token for generative art.
 * This should be used for testing purposes only as there's no use for this
 * in production
 * @param {number} projectNumber a project number to use for the token
 * @returns a true random test token
 */
function generateTestToken(projectNumber) {
    let data = {};
    let hash = "0x";
    for (var i = 0; i < 64; i++) {
      hash += Math.floor(Math.random() * 16).toString(16);
    }
    data.hash = hash;
    data.tokenId = (
      projectNumber * 1000000 +
      Math.floor(Math.random() * 1000)
    ).toString();
    return data;
  }
  