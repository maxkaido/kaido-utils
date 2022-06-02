import { describe, expect, test } from "@jest/globals";

const consola = require("consola");
consola.wrapAll();

import telecoder from "./telecoder";

describe("telecoder", () => {
  test("should encode/decode single digits i.e. numbers less than MAX_NUMBER", () => {
    expect(telecoder.encode(0, 1)).toBe("￿");
    expect(telecoder.encode(0, 1)).toBe(telecoder.telecode[0]);
    expect(telecoder.decode(telecoder.encode(0, 1))).toBe(0);
    const N = 1000;
    for (let i = 0; i < N; ++i) {
      const j = Math.round(Math.random() * telecoder.MAX_NUMBER);
      expect(telecoder.encode(j, 1)).toBe(telecoder.telecode[j]);
      expect(telecoder.decode(telecoder.encode(j, 1))).toBe(j);
      // test padding
      expect(telecoder.decode(telecoder.encode(j, 2))).toBe(j);
    }
    consola.info("passed single digit tests:", N);
  });

  test("should encode/decode double digits", () => {
    const failedN = 118298699025;
    expect(telecoder.decode(telecoder.encode(failedN, 2))).toBe(failedN);

    // expect(telecoder.encode(0, 1)).toBe("￿");
    // expect(telecoder.encode(0, 1)).toBe(telecoder.telecode[0]);
    // expect(telecoder.decode(telecoder.encode(0, 1))).toBe(0);
    const N = 1000;
    for (let i = 0; i < N; ++i) {
      const j = Math.round(Math.random() * telecoder.MAX_NUMBER);
      const k = Math.round(Math.random() * telecoder.MAX_NUMBER);
      const n = j * telecoder.MAX_NUMBER + k;
      expect(telecoder.decode(telecoder.encode(n, 2))).toBe(n);
      // with padding
      expect(telecoder.decode(telecoder.encode(n, 3))).toBe(n);
      expect(telecoder.decode(telecoder.encode(n, 4))).toBe(n);
    }
    consola.info("passed double digits tests:", N);
  });
});
