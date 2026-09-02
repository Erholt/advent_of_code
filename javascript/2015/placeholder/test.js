const test   = require("node:test");
const assert = require("node:assert");

const { solution_1, solution_2 } = require("./script");

// Solution 1

test ("solution_1 returns 'Hello World!'", () => {
  assert.strictEqual(solution_1("test"), "Hello World!");
});

// Solution 2

test ("solution_2 returns 'Hello World!'", () => {
  assert.strictEqual(solution_2("test"), "Hello World!");
});
