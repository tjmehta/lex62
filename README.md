# lex62 [![Build Status](https://travis-ci.org/tjmehta/lex62.svg?branch=master)](https://travis-ci.org/tjmehta/lex62) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
Fast, [lexicographic](https://en.wikipedia.org/wiki/Lexicographical_order) base62 encode and decode

# Installation
```bash
npm i --save lex62
```

# Design notes
 * ideas from http://www.zanopha.com/docs/elen.pdf
 * lexigraphical order: A < Z < a < z < 0 < 9
 * ensures lexicographical order by appending an alphabetic prefix (based on number of digits).
 * `decode` will only work with base64 numbers that have an expected prefix (alphabetic prefix appended to ensure lexigraphic order).
 * `encode` should work with any positive integer (and zero) as long as it is not _very_ large ~> 1e90.

# Usage
##### encode
```js
import { encode, decode } from 'lex62';

.encode(0) // 'A0'
.encode(1) // 'A1'
.encode(9) // 'A9'
.encode(10) // 'AA'
.encode(35) // 'AZ'
.encode(36) // 'Aa'
.encode(61) // 'Az'
.encode(62) // 'B10'
.encode(123) // 'B1z'
.encode(3843) // 'Bzz'
.encode(3844) // 'C100'
.encode(238327) // 'Czzz'

// errors
.encode('yo')
// throws [AssertionError: 'encode: invalid base10 (not a number)']
.encode(-10)
// throws [AssertionError: 'encode: number not supported (must be a positive integer or zero)']
.encode(1e90)
// throws [AssertionError: 'encode: number not supported (too large)']
```

##### decode
* decode only works w/ base62 numbers which follow the format outputted by encode.
```js
import { encode, decode } from '';

.decode('A0') // 0
.decode('A1') // 1
.decode('A9') // 9
.decode('AA') // 10
.decode('AZ') // 35
.decode('Aa') // 36
.decode('Az') // 61
.decode('B10') // 62
.decode('B1z') // 123
.decode('Bzz') // 3843
.decode('C100') // 3844
.decode('Czzz') // 238327

// errors
.decode('A*')
// throws [AssertionError: 'decode: invalid base62 ("A*" not base62)']
.decode('B0')
// throws [AssertionError: 'decode: number not supported (unexpected prefix)']
.decode('B00')
// throws [AssertionError: 'decode: number not supported (unexpected zero)']
.decode('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
// throws [AssertionError: 'decode: number not supported (too large)']
```

# License
MIT
