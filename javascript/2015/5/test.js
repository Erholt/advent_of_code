const test   = require("node:test");
const assert = require("node:assert");
const fs     = require("node:fs");
const path   = require("node:path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();
const { solution_1, solution_2, apply_rules } = require("./script");


test.describe("Day 5", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 returns 1 validated string", () => {
      assert.strictEqual(
        solution_1(["ugknbfddgicrmopn"]),
        1
      );
    });

    test ("solution_1 returns 1 validated string", () => {
      assert.strictEqual(
        solution_1(["aaa"]),
        1
      );
    });

    test ("solution_1 returns 1 failed string", () => {
      assert.strictEqual(
        solution_1(["jchzalrnumimnmhp"]),
        0
      );
    });

    test ("solution_1 returns 1 failed string", () => {
      assert.strictEqual(
        solution_1(["haegwjzuvuyypxyu"]),
        0
      );
    });

    test ("solution_1 returns 1 failed string", () => {
      assert.strictEqual(
        solution_1(["dvszwmarrgswjxmb"]),
        0
      );
    });

    test ("solution_1 with all combined have correct amount", () => {
      assert.strictEqual(
        solution_1(["ugknbfddgicrmopn", "aaa", "jchzalrnumimnmhp", "haegwjzuvuyypxyu", "dvszwmarrgswjxmb"]),
        2
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

  // Apply Rules
  test.describe("Apply Rules", () => {
    test ("apply_rules returns true for valid string", () => {
      assert.strictEqual(
        apply_rules("aaa"),
        true
      );
    });

    test ("apply_rules returns false for invalid string (String contains bad combinations)", () => {
      assert.strictEqual(
        apply_rules("aaab"),
        false
      );
      assert.strictEqual(
        apply_rules("aaacd"),
        false
      );
      assert.strictEqual(
        apply_rules("aaapq"),
        false
      );
      assert.strictEqual(
        apply_rules("aaaxy"),
        false
      );
    });

    test ("apply_rules returns false for invalid string (No double letter)", () => {
      assert.strictEqual(
        apply_rules("jchzalrnumimnmhp"),
        false
      );
    });

    test ("apply_rules returns false for invalid string (Contains only 1 vowel)", () => {
      assert.strictEqual(
        apply_rules("dvszwmarrgswjxmb"),
        false
      );
    });
  });
});
