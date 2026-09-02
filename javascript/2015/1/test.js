const test   = require("node:test");
const assert = require("node:assert");

const { solution_1, solution_2 } = require("./script");

// Solution 1

test("solution_1 when given a input resulting in floor 0", () => {
  assert.strictEqual(
    solution_1("(())"),
    0
  );

  assert.strictEqual(
    solution_1("()()"),
    0
  );
});

test("solution_1 when given a input resulting in floor 3", () => {
  assert.strictEqual(
    solution_1("((("),
    3
  );

  assert.strictEqual(
    solution_1("(()(()("),
    3
  );

  assert.strictEqual(
    solution_1("))((((("),
    3
  );
});

test("solution_1 when given a input resulting in floor -1", () => {
  assert.strictEqual(
    solution_1("())"),
    -1
  );

  assert.strictEqual(
    solution_1("))("),
    -1
  );
});

test("solution_1 when given a input resulting in floor -3", () => {
  assert.strictEqual(
    solution_1(")))"),
    -3
  );

  assert.strictEqual(
    solution_1(")())())"),
    -3
  );
});

// Solution 2

test("solution_2 when given a input resulting in position 1", () => {
  assert.strictEqual(
    solution_2(")"),
    1
  );
});

test("solution_2 when given a input resulting in position 5", () => {
  assert.strictEqual(
    solution_2("()())"),
    5
  );
});
