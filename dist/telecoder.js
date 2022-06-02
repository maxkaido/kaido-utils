"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class Telecoder {
    reverseLookupMap = {};
    telecode = [];
    MAX_NUMBER;
    constructor() {
        const safeCodes = require("./safe_codes.json").telecode;
        // const telecodes = [...safeCodes];
        let simpleCodes = [];
        for (let i = 0; i < safeCodes.length; ++i) {
            if (safeCodes[i] === 1)
                simpleCodes.push(String.fromCodePoint(i));
        }
        simpleCodes = lodash_1.default.uniq(simpleCodes).sort().reverse();
        this.telecode = [...simpleCodes];
        this.MAX_NUMBER = this.telecode.length - 1;
        for (let i = 0; i < this.telecode.length; ++i) {
            this.reverseLookupMap[this.telecode[i]] = i;
        }
    }
    encode(n, length) {
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
    decode(str) {
        const [...arr] = str;
        // consola.info(arr);
        let lastChar;
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
}
exports.default = new Telecoder();