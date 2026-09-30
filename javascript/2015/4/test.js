const test   = require("node:test");
const assert = require("node:assert");

const { solution_1 } = require("./script");


test.describe.skip("Day 4 - skipped: slow MD5 brute force", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 returns the lowest number to make an MD5 hash", () => {
      assert.strictEqual(
        solution_1("abcdef"),
        609043
      );
    });

    test ("solution_1 returns the lowest number to make an MD5 hash", () => {
      assert.strictEqual(
        solution_1("pqrstuv"),
        1048970
      );
    });
  });
}); 
