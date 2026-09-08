const test   = require("node:test");
const assert = require("node:assert");
const fs     = require("node:fs");
const path   = require("node:path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();
const { solution_1, solution_2 } = require("./script");


test.describe("Day 4", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 returns the lowest number to make an MD5 hash!'", () => {
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

  // Solution 2
  // test.describe("Solution 2", () => {
  //   test ("solution_2 returns 'World Hello!'", () => {
  //     assert.strictEqual(
  //       solution_2("test"),
  //       "World Hello!"
  //     );
  //   });
  // });
});

console.log(`Day 4, Solution 1: ${solution_1(input)}`);
console.log(`Day 4, Solution 2: ${solution_2(input)}`);