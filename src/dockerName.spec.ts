import { describe, expect, test } from "@jest/globals";

import dockerName from "./dockerName";

describe("dockerName", () => {
  test("should return the correct name", () => {
    expect(dockerName("-")).toBeDefined();
  });
});
