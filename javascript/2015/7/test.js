const test   = require("node:test");
const assert = require("node:assert");

const { solution_1, solution_2 } = require("./script");

let input = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`

test.describe("Day 7", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 returns an object containing letters with values", () => {
      assert.strictEqual(
        solution_1(input),
        {
          d: 72,
          e: 507,
          f: 492,
          g: 114,
          h: 65412,
          i: 65079,
          x: 123,
          y: 456
        }
      );
    });
  }); 

  // Solution 2
  test.describe("Solution 2", () => {
    test ("solution_2 returns 'World Hello!'", () => {
      assert.strictEqual(
        solution_2("test"),
        "World Hello!"
      );
    });
  });
});
