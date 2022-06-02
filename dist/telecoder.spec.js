"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const consola = require("consola");
consola.wrapAll();
const telecoder_1 = __importDefault(require("./telecoder"));
(0, globals_1.describe)("telecoder", () => {
    (0, globals_1.test)("should encode/decode single digits i.e. numbers less than MAX_NUMBER", () => {
        (0, globals_1.expect)(telecoder_1.default.encode(0, 1)).toBe("￿");
        (0, globals_1.expect)(telecoder_1.default.encode(0, 1)).toBe(telecoder_1.default.telecode[0]);
        (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(0, 1))).toBe(0);
        const N = 1000;
        for (let i = 0; i < N; ++i) {
            const j = Math.round(Math.random() * telecoder_1.default.MAX_NUMBER);
            (0, globals_1.expect)(telecoder_1.default.encode(j, 1)).toBe(telecoder_1.default.telecode[j]);
            (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(j, 1))).toBe(j);
            // test padding
            (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(j, 2))).toBe(j);
        }
        consola.info("passed single digit tests:", N);
    });
    (0, globals_1.test)("should encode/decode double digits", () => {
        const failedN = 118298699025;
        (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(failedN, 2))).toBe(failedN);
        // expect(telecoder.encode(0, 1)).toBe("￿");
        // expect(telecoder.encode(0, 1)).toBe(telecoder.telecode[0]);
        // expect(telecoder.decode(telecoder.encode(0, 1))).toBe(0);
        const N = 1000;
        for (let i = 0; i < N; ++i) {
            const j = Math.round(Math.random() * telecoder_1.default.MAX_NUMBER);
            const k = Math.round(Math.random() * telecoder_1.default.MAX_NUMBER);
            const n = j * telecoder_1.default.MAX_NUMBER + k;
            (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(n, 2))).toBe(n);
            // with padding
            (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(n, 3))).toBe(n);
            (0, globals_1.expect)(telecoder_1.default.decode(telecoder_1.default.encode(n, 4))).toBe(n);
        }
        consola.info("passed double digits tests:", N);
    });
});
