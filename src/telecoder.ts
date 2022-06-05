import zlib from "zlib";
import _ from "lodash";

class Telecoder {
  reverseLookupMap: any = {};
  telecode: any = [];
  MAX_NUMBER: number;

  constructor() {
    const safeCodes = require("./safe_codes.json").telecode;
    // const telecodes = [...safeCodes];
    let simpleCodes: any = [];
    for (let i = 0; i < safeCodes.length; ++i) {
      if (safeCodes[i] === 1) simpleCodes.push(String.fromCodePoint(i));
    }
    simpleCodes = _.uniq(simpleCodes).sort().reverse();
    this.telecode = [...simpleCodes];
    this.MAX_NUMBER = this.telecode.length - 1;

    for (let i = 0; i < this.telecode.length; ++i) {
      this.reverseLookupMap[this.telecode[i]] = i;
    }
  }
  encode(n: number, length: number): string {
    let digits = 1;
    while (this.MAX_NUMBER ** digits < n) {
      digits++;
    }
    const result = [];
    for (let i = 0; i < digits; ++i) {
      const power = digits - i - 1;
      const digit = Math.floor(n / this.MAX_NUMBER ** power);
      n -= digit * this.MAX_NUMBER ** power;
      result.push(this.telecode[digit]);
    }
    const padding = this.telecode[0].repeat(length - result.length);
    // consola.info({ result, padding });

    return padding + result.join("");
  }

  decode(str: string): number {
    const [...arr]: any = str;
    // consola.info(arr);
    let lastChar: string;
    let result = 0;
    let power = 0;
    while (arr.length > 0) {
      lastChar = arr.pop();
      result += this.reverseLookupMap[lastChar] * this.MAX_NUMBER ** power;
      // consola.info({ lastChar, result });
      power++;
    }
    return result;
  }

  bignum2str(num: number) {
    // 2 digit unicode ~ 1.21e12
    const dig1 = Math.floor(num / (this.MAX_NUMBER + 1));
    const dig2 = num % (this.MAX_NUMBER + 1);
    const char1 = this.telecode[dig1];
    const char2 = this.telecode[dig2];
    return char1 + char2;
  }

  str2bignum(chars: any[]) {
    const char1 = chars[0];
    const char2 = chars[1];
    // consola.warn(`char1: ${char1} char2: ${char2}`);
    const dig1: any = this.reverseLookupMap[char1];
    const dig2: any = this.reverseLookupMap[char2];
    // consola.info(`str: ${chars.join("")} dig1: ${dig1}, dig2: ${dig2}`);
    return dig1 * (this.MAX_NUMBER + 1) + dig2;
  }

  buf2str = (buf: Buffer): string => {
    if (buf.length > 5)
      return this.buf2str(buf.slice(0, 5)) + this.buf2str(buf.slice(5));
    const bignum = parseInt(buf.toString("hex"), 16);
    // consola.info({ buf, bignum });
    return this.bignum2str(bignum);
  };

  str2buf: any = ([...charArray]: any, length = 5) => {
    if (charArray.length > 2)
      return Buffer.concat([
        this.str2buf(charArray.slice(0, 2), 5),
        this.str2buf(charArray.slice(2), length - 5),
      ]);
    const bignum = this.str2bignum(charArray);
    let bignum16 = bignum.toString(16);
    bignum16 =
      new Array(2 * length - bignum16.length).fill(0).join("") + bignum16;
    const bytesCount = Math.round(bignum16.length / 2);
    const buf = Buffer.alloc(bytesCount);
    for (let i = 0; i < bytesCount; ++i) {
      buf.writeUInt8(parseInt("0x" + bignum16.slice(i * 2, i * 2 + 2), 16), i);
    }
    // consola.info({ decodedbignum: bignum, bignum16, buf, length });
    return buf;
  };

  obj2str: any = (obj: any) => {
    const strInfl = JSON.stringify(obj);
    const bufDefl = zlib.deflateSync(strInfl);
    const strDefl = this.buf2str(bufDefl);
    const lengthChar = this.telecode[bufDefl.length];
    const strWithLengthChar = lengthChar + strDefl;
    const lengthInfl = strInfl.length;
    const lengthDefl = strDefl.length;
    console.log({
      // strWithLengthChar,
      lengthInfl,
      lengthDefl,
      rate: ((lengthDefl / lengthInfl) * 100).toFixed(1) + "%",
    });
    return strWithLengthChar;
  };
  str2obj: any = (strWithLengthChar: any) => {
    const [lc, ...sd] = strWithLengthChar;
    const l = this.reverseLookupMap[lc];
    const bd = this.str2buf(sd, l);
    // bd.should.deep.equal(bufDefl);
    const si = zlib.inflateSync(bd).toString();
    // si.should.equal(strInfl);
    return JSON.parse(si);
  };
}

export default new Telecoder();
