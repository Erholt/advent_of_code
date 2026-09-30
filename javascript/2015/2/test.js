const test   = require("node:test");
const assert = require("node:assert");

const { solution_1, solution_2, gift } = require("./script");

test.describe("Day 2", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test("solution_1 returns 58", () => {
      assert.strictEqual(
        solution_1(["2x3x4"]),
        58
      );
    });

    test("solution_1 returns 43", () => {
      assert.strictEqual(
        solution_1(["1x1x10"]),
        43
      );
    });
  });

  // Solution 2
  test.describe("Solution 2", () => {
    test("solution_2 returns 34", () => {
      assert.strictEqual(
        solution_2(["2x3x4"]),
        34
      );
    });

    test("solution_2 returns 14", () => {
      assert.strictEqual(
        solution_2(["1x1x10"]),
        14
      );
    });
  });

  // Gift Object
  test.describe("Gift Object", () => {
    test.describe("wrapping paper", () => {
      test("returns correct amount for 2x3x4", () => {
        assert.strictEqual(
          gift("2x3x4").wrapping_paper,
          58
        );
      });

      test("returns correct amount for 1x1x10", () => {
        assert.strictEqual(
          gift("1x1x10").wrapping_paper,
          43
        );
      });
    });

    test.describe("ribbon", () => {
      test("returns correct amount for 2x3x4", () => {
        assert.strictEqual(
          gift("2x3x4").ribbon,
          34
        );
      });

      test("returns correct amount for 1x1x10", () => {
        assert.strictEqual(
          gift("1x1x10").ribbon,
          14
        );
      });
    });
  });
});
