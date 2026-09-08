const test   = require("node:test");
const assert = require("node:assert");
const fs     = require("node:fs");
const path   = require("node:path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();
const { solution_1, solution_2, coordinates } = require("./script");


test.describe("Day 3", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 returns the correct", () => {
      assert.strictEqual(
        solution_1(">"),
        2
      );

      assert.strictEqual(
        solution_1("^>v<"),
        4
      );

      assert.strictEqual(
        solution_1("^v^v^v^v^v"),
        2
      );
    });
  });

  // Solution 2
  test.describe("Solution 2", () => {
    test ("solution_2 returns the correct", () => {
      assert.strictEqual(
        solution_2("^v"),
        3
      );

      assert.strictEqual(
        solution_2("^>v<"),
        3
      );

      assert.strictEqual(
        solution_2("^v^v^v^v^v"),
        11
      );
    });
  });

 // Coordinates Object
  test.describe("Coordinates", () => {
    test.describe("#current_position", () => {
      test("returns correct position", () => {
        assert.deepStrictEqual(
          coordinates().current_position,
          { x: 0, y: 0 }
        );
      });

      test("returns correct position after multiple directions", () => {
        let position = coordinates();

        position.go_north();
        position.go_north();
        position.go_east();

        assert.deepStrictEqual(
          position.current_position,
          { x: 1, y: 2 }
        );
      });
    });

    test.describe("#to_string()", () => {
      test("returns position as string", () => {
        assert.deepStrictEqual(
          coordinates().to_string(),
          "0,0"
        );
      });

      test("returns correct position after multiple directions", () => {
        let position = coordinates();

        position.go_north();
        position.go_north();
        position.go_east();

        assert.deepStrictEqual(
          position.current_position,
          { x: 1, y: 2 }
        );
      });
    });

    test.describe("#go_north", () => {
      test("#go_north moves the coordinates north by one", () => {
        let position = coordinates();

        position.go_north();

        assert.deepStrictEqual(
          position.current_position,
          { x: 0, y: 1 }
        );
      });

      test("multiple uses of #go_north moves the coordinates north by two", () => {
        let position = coordinates();

        position.go_north();
        position.go_north();

        assert.deepStrictEqual(
          position.current_position,
          { x: 0, y: 2 }
        );
      });
    });

    test.describe("#go_south", () => {
      test("#go_south moves the coordinates south by one", () => {
        let position = coordinates();

        position.go_south();

        assert.deepStrictEqual(
          position.current_position,
          { x: 0, y: -1 }
        );
      });
    });
    
    test.describe("#go_east", () => {
      test("#go_east moves the coordinates east by one", () => {
        let position = coordinates();

        position.go_east();

        assert.deepStrictEqual(
          position.current_position,
          { x: 1, y: 0 }
        );
      });
    });

    test.describe("#go_west", () => {
      test("#go_west moves the coordinates west by one", () => {
        let position = coordinates();

        position.go_west();

        assert.deepStrictEqual(
          position.current_position,
          { x: -1, y: 0 }
        );
      });
    });
  });  
});
