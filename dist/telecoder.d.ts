declare class Telecoder {
    reverseLookupMap: any;
    telecode: any;
    MAX_NUMBER: number;
    constructor();
    encode(n: number, length: number): string;
    decode(str: string): number;
}
declare const _default: Telecoder;
export default _default;
