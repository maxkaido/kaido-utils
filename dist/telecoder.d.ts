declare class Telecoder {
    reverseLookupMap: any;
    telecode: any;
    MAX_NUMBER: number;
    constructor();
    encode(n: number, length: number): string;
    decode(str: string): number;
    bignum2str(num: number): any;
    str2bignum(chars: any[]): any;
    buf2str: (buf: Buffer) => string;
    str2buf: any;
    obj2str: any;
    str2obj: any;
}
declare const _default: Telecoder;
export default _default;
