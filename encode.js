const binarize = require('fast-bin/binarize');
const unbinarize = require('fast-bin/unbinarize');
const countBy = require('lodash.countby');

// https://en.wikipedia.org/wiki/List_of_Unicode_characters
const DEFAULT_INVALID_CHAR_CODES = new Set([
  34, // quotation mark
  39, // apostrophe,
  47, // slash
  92, // backslash
  160 // non-breaking space
]);

const encode = (numbers,  options = {}) => {

  const invalid_char_codes = options.invalid_char_codes || DEFAULT_INVALID_CHAR_CODES;

  const debug = options.debug || false;
  if (debug) console.log("starting dynachar/encode");

  // convert numbers to binary
  const { nbits, data: bits } = binarize({ data: numbers });
  if (debug) console.log("nbits:", nbits);
  if (debug) console.log("bits:", bits);

  // pad zeroes to the end to make divisible by 8
  const padding = 8 - (bits.length % 8);
  if (debug) console.log("padding:", padding);
  let padded_bits = bits;
  for (let i = 0; i < padding; i++) padded_bits += '0';

  // convert bits to 8-bit numbers
  const arr = unbinarize({ nbits: 8, data: padded_bits});
  if (debug) console.log("arr:", arr);

  const counts = Object.entries(countBy(arr)).sort((a, b) => Math.sign(b[1] - a[1]));
  if (debug) console.log("counts:", counts);

  // get valid chars
  const chars = [];
  let charCode = 31; // skip first 31 chars
  while (chars.length < counts.length) {
    charCode++;
    if (invalid_char_codes.has(charCode)) continue;
    if (charCode >= 127 && charCode <= 159) continue; // C1 Control Codes
    chars.push(String.fromCharCode(charCode));
  }
  if (debug) console.log("chars:", chars);

  const char2num = {};
  const num2char = {};

  // convert numbers to letters
  counts.forEach(([num, count]) => {
    const char = chars.shift();
    char2num[char] = Number.parseInt(num);
    num2char[num] = char;
  });
  if (debug) console.log("char2num:", char2num);
  if (debug) console.log("num2char:", num2char);

  let encoded = "";
  for (let i = 0; i < arr.length; i++) {
    encoded += num2char[arr[i]];
  }
  if (debug) console.log("encoded:", [encoded]);

  return { char2num, data: encoded, nbits, padding };
};

module.exports = encode;
