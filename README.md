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
var lex62 = require('lex62')

lex62.encode(0) // 'A0'
lex62.encode(1) // 'A1'
lex62.encode(9) // 'A9'
lex62.encode(10) // 'AA'
lex62.encode(35) // 'AZ'
lex62.encode(36) // 'Aa'
lex62.encode(61) // 'Az'
lex62.encode(62) // 'B10'
lex62.encode(123) // 'B1z'
lex62.encode(3843) // 'Bzz'
lex62.encode(3844) // 'C100'
lex62.encode(238327) // 'Czzz'

// errors
lex62.encode('yo')
// throws [AssertionError: 'encode: invalid base10 (not a number)']
lex62.encode(-10)
// throws [AssertionError: 'encode: number not supported (must be a positive integer or zero)']
lex62.encode(1e90)
// throws [AssertionError: 'encode: number not supported (too large)']
```

##### decode
* decode only works w/ base62 numbers which follow the format outputted by encode.
```js
var lex62 = require('lex62')

lex62.decode('A0') // 0
lex62.decode('A1') // 1
lex62.decode('A9') // 9
lex62.decode('AA') // 10
lex62.decode('AZ') // 35
lex62.decode('Aa') // 36
lex62.decode('Az') // 61
lex62.decode('B10') // 62
lex62.decode('B1z') // 123
lex62.decode('Bzz') // 3843
lex62.decode('C100') // 3844
lex62.decode('Czzz') // 238327

// errors
lex62.decode('A*')
// throws [AssertionError: 'decode: invalid base62 ("A*" not base62)']
lex62.decode('B0')
// throws [AssertionError: 'decode: number not supported (unexpected prefix)']
lex62.decode('B00')
// throws [AssertionError: 'decode: number not supported (unexpected zero)']
lex62.decode('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
// throws [AssertionError: 'decode: number not supported (too large)']
```

# License
MIT
