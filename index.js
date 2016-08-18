'use strict'

var assert = require('assert')

var isNumber = require('101/is-number')
var isPositiveInteger = require('is-positive-integer')

var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
var charMap = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29, 'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35, 'a': 36, 'b': 37, 'c': 38, 'd': 39, 'e': 40, 'f': 41, 'g': 42, 'h': 43, 'i': 44, 'j': 45, 'k': 46, 'l': 47, 'm': 48, 'n': 49, 'o': 50, 'p': 51, 'q': 52, 'r': 53, 's': 54, 't': 55, 'u': 56, 'v': 57, 'w': 58, 'x': 59, 'y': 60, 'z': 61 }

// Firepad lexicographic base62
// Based off ideas from http://www.zanopha.com/docs/elen.pdf
module.exports = {
  encode: encode,
  decode: decode
}

function encode (base10) {
  assert(isNumber(base10), 'encode: invalid base10 (not a number)')
  assert(base10 === 0 || isPositiveInteger(base10), 'encode: number not supported (must be a positive integer or zero)')
  var str = (base10 === 0)
    ? '0'
    : ''
  while (base10 > 0) {
    var digit = (base10 % characters.length)
    str = characters[digit] + str
    base10 -= digit
    base10 /= characters.length
  }
  var prefix = getPrefix(str.length, 'encode')
  return prefix + str
}

function decode (base62) {
  // Ensure the revision has expected prefix and is not empty
  var base62Char = base62[0]
  assert(base62Char in charMap, 'decode: invalid base62 ("' + base62 + '" not base62)')
  var expectedPrefix = getPrefix(base62.length - 1, 'decode')
  assert(base62Char === expectedPrefix, 'decode: number not supported (unexpected prefix)')
  assert(base62[1] !== '0' || expectedPrefix === 'A', 'decode: number not supported (unexpected zero)')
  var base10 = 0
  var base10Char
  var state = {
    base10: 0
  }
  for (var i = 1; i < base62.length; i++) {
    base10 *= characters.length
    base62Char = base62[i]
    assert(base62Char in charMap, 'decode: invalid base62 ("' + base62 + '" not base62)')
    base10Char = charMap[base62Char]
    base10 += base10Char
  }
  return base10
}

// Prefix with length (starting at 'A' for length 1) to ensure the id's sort lexicographically.
function getPrefix (len, method) {
  var index = len + 9
  assert(index < 62, method + ': number not supported (too large)' )
  return characters[index]
}
