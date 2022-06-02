import { describe, expect, test } from "@jest/globals";

import isEmail from "./isEmail";

describe("utils", function () {
  test("should check email validity", function () {
    expect(isEmail("some@email.com")).toBe(true);
    expect(isEmail("some@email")).toBe(false);
  });
});
