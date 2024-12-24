"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lex62GetPrefixError = exports.Lex62Error = void 0;
exports.encode = encode;
exports.decode = decode;
const is_number_1 = __importDefault(require("101/is-number"));
const is_string_1 = __importDefault(require("101/is-string"));
const is_positive_integer_1 = __importDefault(require("is-positive-integer"));
const baseerr_1 = __importDefault(require("baseerr"));
class Lex62Error extends baseerr_1.default {
}
exports.Lex62Error = Lex62Error;
class Lex62GetPrefixError extends baseerr_1.default {
}
exports.Lex62GetPrefixError = Lex62GetPrefixError;
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const charMap = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18,
    'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27,
    'S': 28, 'T': 29, 'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35, 'a': 36,
    'b': 37, 'c': 38, 'd': 39, 'e': 40, 'f': 41, 'g': 42, 'h': 43, 'i': 44, 'j': 45,
    'k': 46, 'l': 47, 'm': 48, 'n': 49, 'o': 50, 'p': 51, 'q': 52, 'r': 53, 's': 54,
    't': 55, 'u': 56, 'v': 57, 'w': 58, 'x': 59, 'y': 60, 'z': 61
};
const CHAR_INDEX_OFFSET = 9; // 'A' is 10, 'B' is 11, etc.
// Prefix with length (starting at 'A' for length 1) to ensure the id's sort lexicographically.
function getPrefix(len, method, debug) {
    const index = len + CHAR_INDEX_OFFSET;
    if (index >= 62) {
        throw new Lex62GetPrefixError(`${method}: number not supported (too large)`, {
            method,
            ...debug
        });
    }
    return characters[index];
}
function encode(base10) {
    if (!(0, is_number_1.default)(base10)) {
        throw new Lex62Error('encode: invalid base10 (not a number)', { base10 });
    }
    if (base10 !== 0 && !(0, is_positive_integer_1.default)(base10)) {
        throw new Lex62Error('encode: number not supported (must be a positive integer or zero)', { base10 });
    }
    let str = base10 === 0 ? '0' : '';
    let num = base10;
    while (num > 0) {
        const digit = num % characters.length;
        str = characters[digit] + str;
        num -= digit;
        num /= characters.length;
    }
    const prefix = getPrefix(str.length, 'encode', { base10, partialBase62: str });
    return prefix + str;
}
function decode(base62) {
    if (!(0, is_string_1.default)(base62)) {
        throw new Lex62Error('decode: invalid base62 (not a string)', { base62 });
    }
    const base62Char = base62[0];
    if (!(base62Char in charMap)) {
        throw new Lex62Error(`decode: invalid base62 ("${base62}" not base62)`, { base62 });
    }
    const expectedPrefix = getPrefix(base62.length - 1, 'decode', { base62 });
    if (base62Char !== expectedPrefix) {
        throw new Lex62GetPrefixError('decode: number not supported (unexpected prefix)', { method: 'decode', base62, expectedPrefix });
    }
    if (base62[1] === '0' && expectedPrefix !== 'A') {
        throw new Lex62GetPrefixError('decode: number not supported (unexpected zero)', { method: 'decode', base62, expectedPrefix });
    }
    let base10 = 0;
    for (let i = 1; i < base62.length; i++) {
        base10 *= characters.length;
        const base62Char = base62[i];
        if (!(base62Char in charMap)) {
            throw new Lex62Error(`decode: invalid base62 ("${base62}" not base62)`, { base62, partialBase10: base10 });
        }
        base10 += charMap[base62Char];
    }
    return base10;
}
//# sourceMappingURL=index.js.map