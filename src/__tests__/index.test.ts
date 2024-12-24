import { encode, decode } from '../'

describe('lex62', () => {
  const base10 = [
    0,
    62,
    100,
    1000,
    10000000,
    10000000000
  ]

  const base62 = [
    'A0',
    'B10',
    'B1c',
    'BG8',
    'DfxSK',
    'FAukyoa'
  ]

  describe('encode', () => {
    // Test each base10 number encoding
    test.each(base10.map((num, i) => [num, base62[i]]))(
      'should encode %p to %p',
      (input, expected) => {
        expect(encode(input)).toBe(expected)
      }
    )

    describe('errors', () => {
      const invalidInputs: [any, string][] = [
        ['yo', 'encode: invalid base10 (not a number)'],
        [-10, 'encode: number not supported (must be a positive integer or zero)'],
        [1.1, 'encode: number not supported (must be a positive integer or zero)'],
        [1e90, 'encode: number not supported (too large)']
      ]

      test.each(invalidInputs)(
        'should throw error for %p',
        (input, expectedError) => {
          expect(() => encode(input)).toThrow(expectedError)
        }
      )
    })
  })

  describe('decode', () => {
    // Test each base62 string decoding
    test.each(base62.map((str, i) => [str, base10[i]]))(
      'should decode %p to %p',
      (input, expected) => {
        expect(decode(input)).toBe(expected)
      }
    )

    describe('errors', () => {
      const invalidInputs: [any, string][] = [
        [2, 'decode: invalid base62 (not a string)'],
        ['.', 'decode: invalid base62 ("." not base62)'],
        ['A,', 'decode: invalid base62 ("A," not base62)'],
        ['B0', 'decode: number not supported (unexpected prefix)'],
        ['B00', 'decode: number not supported (unexpected zero)'],
        ['zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 'decode: number not supported (too large)']
      ]

      test.each(invalidInputs)(
        'should throw error for %p',
        (input, expectedError) => {
          expect(() => decode(input)).toThrow(expectedError)
        }
      )
    })
  })
})
