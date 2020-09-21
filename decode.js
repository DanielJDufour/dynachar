const binarize = require("fast-bin/binarize");
const unbinarize = require("fast-bin/unbinarize");

const decode = ({ char2num, data, nbits, padding, debug = false }) => {
    if (debug) console.log("starting dynachar/decode");

    // convert characters to 8-bit numbers
    const numbers = [];
    for (let i = 0; i < data.length; i++) numbers.push(char2num[data[i]]);
    if (debug) console.log("numbers:", numbers);

    // convert 8-bit numbers to binary form
    const { data: bits } = binarize({ data: numbers, nbits: 8, sep: "" });
    if (debug) console.log("bits:", bits);

    // remove padding
    const unpadded = bits.slice(0, bits.length - padding);
    if (debug) console.log("unpadded:", unpadded);

    // convert to original un-encoded numbers
    const result = unbinarize({ nbits, data: unpadded });
    if (debug) console.log("result:", result);

    return result;
};

module.exports = decode;
