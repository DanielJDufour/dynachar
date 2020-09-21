const test = require("ava");
const encode = require("./encode");
const decode = require("./decode");

test("round trip", t => {
    const numbers = [];
    for (let i = 0; i < 1000; i++) {
        numbers.push(Math.round(Math.random() * 100) * 10);
    }
    console.log("test numbers:", numbers);
    const { char2num, data, nbits, padding } = encode(numbers, { debug: true });
    const decoded = decode({ char2num, data, nbits, padding, debug: true });
    t.deepEqual(numbers, decoded);
});

test("simple trip", t => {
    const numbers = [920, 550, 340, 690, 550, 340, 840, 700, 550, 210, 540];
    const { char2num, data, nbits, padding } = encode(numbers, { debug: true });
    const decoded = decode({ char2num, data, nbits, padding, debug: true });
    t.deepEqual(numbers, decoded);
});

test("uint8 arrays", t => {
    const numbers = [];
    for (let i = 0; i < 1000; i++) {
        numbers.push(Math.round(Math.random() * 255));
    }
    const uint8array = new Uint8Array(numbers);
    const { char2num, data, nbits, padding } = encode(uint8array, {
        debug: false,
    });
    const decoded = decode({ char2num, data, nbits, padding, debug: false });
    t.deepEqual(numbers, decoded);
});
