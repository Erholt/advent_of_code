const test   = require("node:test");
const assert = require("node:assert");
const fs     = require("node:fs");
const path   = require("node:path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();
const { solution_1, solution_2 } = require("./script");


test.describe("Placeholder", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 returns 'Hello World!'", () => {
      assert.strictEqual(
        solution_1("test"),
        "Hello World!"
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
