'use strict'

var describe = global.describe
var it = global.it

var expect = require('chai').expect

var lex62 = require('../')

describe('lex62', function () {
  var base10 = [
    0,
    62,
    100,
    1000,
    10000000,
    10000000000
  ]
  var base62 = [
    'A0',
    'B10',
    'B1c',
    'BG8',
    'DfxSK',
    'FAukyoa'
  ]
  describe('encode', function () {
    // generated tests
    base10.forEach(function (input, i) {
      it('should encode ' + input, function () {
        expect(lex62.encode(input)).to.equal(base62[i])
      })
    })

    describe('errors', function () {
      var base10 = [
        1e90
      ]
      var errs = [
        'encode: number not supported (too large)'
      ]
      // generated tests
      base10.forEach(function (input, i) {
        it('should error for ' + input, function () {
          expect(function () {
            lex62.encode(input)
          }).to.throw(errs[i])
        })
      })
    })
  })

  describe('decode', function () {
    // generated tests
    base62.forEach(function (input, i) {
      it('should decode ' + input, function () {
        expect(lex62.decode(input)).to.equal(base10[i])
      })
    })

    describe('errors', function () {
      var base62 = [
        '.',
        'A,',
        'B0',
        'B00',
        'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
      ]
      var errs = [
        'decode: invalid base62 ("." not base62)',
        'decode: invalid base62 ("A," not base62)',
        'decode: number not supported (unexpected prefix)',
        'decode: number not supported (unexpected zero)',
        'decode: number not supported (too large)'
      ]
      // generated tests
      base62.forEach(function (input, i) {
        it('should error for ' + input, function () {
          expect(function () {
            lex62.decode(input)
          }).to.throw(errs[i])
        })
      })
    })
  })
})
