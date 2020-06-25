# dynachar
Dynamic Character Encoder and Decoder

# install
```bash
npm install dynachar
```

# usage
## encode
```javascript
const encode = require('dynachar/encode');

const numbers = [920,  550, 340, 690, 550, 340, 840, 700, 550, 210, 540];
const { char2num, data, nbits, padding } = encode(numbers);
// data is "- &%+!*$ ,!)#("
// char2num is { ' ': 34, '!': 137, '#': 40, '$': 77, '%': 82, '&': 101, '(': 112, ')': 141, '*': 149, '+': 178, ',': 188, '-': 230 }
// nbits is 10 (the number of bits needed to represent the numbers)
// padding is 2 (the number of zeros added to the 8-bit intermediary binary representation in order to make it cleanly divisble by 8)
```

## decode
```javascript
const decode = require('dynachar/decode');

const data = '- &%+!*$ ,!)#(';
const char2num = { ' ': 34, '!': 137, '#': 40, '$': 77, '%': 82, '&': 101, '(': 112, ')': 141, '*': 149, '+': 178, ',': 188, '-': 230 };
const nbits = 10;
const padding = 2;
const decoded = decode({ char2num, data, nbits, padding, debug: true });
// decoded is [920,  550, 340, 690, 550, 340, 840, 700, 550, 210, 540]
```
