import BaseError from 'baseerr';
export interface Lex62ErrorProps {
    base10?: number;
    partialBase62?: string;
    base62?: string;
    partialBase10?: number;
}
export declare class Lex62Error extends BaseError<Lex62ErrorProps> {
}
export interface Lex62GetPrefixErrorProps extends Lex62ErrorProps {
    method: string;
    expectedPrefix?: string;
}
export declare class Lex62GetPrefixError extends BaseError<Lex62GetPrefixErrorProps> {
}
export declare function encode(base10: number): string;
export declare function decode(base62: string): number;
