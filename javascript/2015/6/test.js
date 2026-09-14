const test   = require("node:test");
const assert = require("node:assert");
const fs     = require("node:fs");
const path   = require("node:path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();
const { solution_1, solution_2, grid, light, parseInstruction, applyInstructions } = require("./script");


test.describe("Day 6", () => {
  // Solution 1
  test.describe("Solution 1", () => {
    test ("solution_1 turns all lights on", () => {
      assert.strictEqual(
        solution_1(["turn on 0,0 through 999,999"]),
        1_000_000
      );
    });

    test ("solution_1 toggles 1 line of 1_000 lights on", () => {
      assert.strictEqual(
        solution_1(["toggle 0,0 through 999,0"]),
        1_000
      );
    });

    test ("solution_1 turns off 4 lights", () => {
      assert.strictEqual(
        solution_1(["turn off 499,499 through 500,500"]),
        0
      );
    });

    test ("solution_1 with all combined have correct amount", () => {
      assert.strictEqual(
        solution_1([
          "turn on 0,0 through 999,999",
          "toggle 0,0 through 999,0",
          "turn off 499,499 through 500,500"
        ]),
        998_996
      );
    });
  }); 

  // Solution 2
  test.describe("Solution 2", () => {
    test ("solution_2 turns all lights on", () => {
      assert.strictEqual(
        solution_2(["turn on 0,0 through 999,999"]),
        1_000_000
      )});

    test ("solution_2 toggles 1 line of 1_000 lights on", () => {
      assert.strictEqual(
        solution_2(["toggle 0,0 through 999,0"]),
        2_000
      );
    });
  });

  // #Grid
  test.describe("Grid", () => {
    test ("grid is created with correct size", () => {
      let subject = grid();
      assert.strictEqual(subject.grid.length, 1_000_000);
    });

    test ("grid can get lights between x, y", () => {
      let subject = grid();
      let lights  = subject.get_lights([499, 499], [500, 500]);
     
      assert.strictEqual(lights.length, 4);
      assert.strictEqual(lights[0].coordinates().x, 499);
      assert.strictEqual(lights[0].coordinates().y, 499);
      assert.strictEqual(lights[1].coordinates().x, 499);
      assert.strictEqual(lights[1].coordinates().y, 500);
      assert.strictEqual(lights[2].coordinates().x, 500);
      assert.strictEqual(lights[2].coordinates().y, 499);
      assert.strictEqual(lights[3].coordinates().x, 500);
      assert.strictEqual(lights[3].coordinates().y, 500);
    });

    test ("grid can get light at x, y", () => {
      let subject = grid();
      let light   = subject.get_light(499, 499);

      assert.strictEqual(light.coordinates().x, 499);
      assert.strictEqual(light.coordinates().y, 499);
    });

    test ("grid can get total lights on", () => {
      let subject = grid();
      let lights  = subject.get_lights([499, 499], [500, 500]);

      lights.map(light => light.turn_on());
      assert.strictEqual(
        subject.get_total_lights_on(),
        4
      );
    });

    test ("grid can get total brightness", () => {
      let subject = grid();
      let lights  = subject.get_lights([499, 499], [500, 500]);

      lights.map(light => light.increase_brightness());
      assert.strictEqual(
        subject.get_total_brightness(),
        4
      );
    });
  });

  // #Light
  test.describe("Light", () => {
    test ("light is created with correct x, y, and state", () => {
      let subject = light(1, 2);
      assert.strictEqual(subject.coordinates().x, 1);
      assert.strictEqual(subject.coordinates().y, 2);
      assert.strictEqual(subject.state, false);
    });

    test ("light can be turned on", () => {
      let subject = light(1, 2);
      subject.turn_on();
      assert.strictEqual(subject.state, true);
    });

    test ("light can be turned off", () => {
      let subject = light(1, 2, true);
      subject.turn_off();
      assert.strictEqual(subject.state, false);
    });

    test ("light can be toggled", () => {
      let subject = light(1, 2);
      subject.toggle();
      assert.strictEqual(subject.state, true);
      subject.toggle();
      assert.strictEqual(subject.state, false);
    });

    test ("light can increase brightness", () => {
      let subject = light(1, 2);
      subject.increase_brightness();
      assert.strictEqual(subject.brightness, 1);
    });

    test ("light can decrease brightness", () => {
      let subject = light(1, 2, 1);
      subject.decrease_brightness();
      assert.strictEqual(subject.brightness, 0);
    });

    test ("light cannot decrease brightness below 0", () => {
      let subject = light(1, 2);
      subject.decrease_brightness();
      assert.strictEqual(subject.brightness, 0);
    });
  });

  // #parseInstruction
  test.describe("parseInstruction", () => {
    test ("parses instruction correctly", () => {
      let instruction = "turn on 0,0 through 999,999";
      let parsed      = parseInstruction(instruction);

      assert.strictEqual(parsed.action, "turn on");
      assert.deepStrictEqual(parsed.start, [0, 0]);
      assert.deepStrictEqual(parsed.end, [999, 999]);
    });

    test ("parses instruction with toggle correctly", () => {
      let instruction = "toggle 0,0 through 999,999";
      let parsed      = parseInstruction(instruction);

      assert.strictEqual(parsed.action, "toggle");
      assert.deepStrictEqual(parsed.start, [0, 0]);
      assert.deepStrictEqual(parsed.end, [999, 999]);
    });

    test ("parses instruction with turn off correctly", () => {
      let instruction = "turn off 0,0 through 999,999";
      let parsed      = parseInstruction(instruction);

      assert.strictEqual(parsed.action, "turn off");
      assert.deepStrictEqual(parsed.start, [0, 0]);
      assert.deepStrictEqual(parsed.end, [999, 999]);
    });
  });

  // #applyInstructions
  test.describe("applyInstructions", () => {
    test.describe("when using .get_total_lights_on", () => {
      test("applies instructions to grid", () => {
        let lightGrid = grid();
        let actionMap = { "turn on": light => light.turn_on() };
        let input     = ["turn on 0,0 through 0,0"];

        applyInstructions(input, lightGrid, actionMap, grid => grid.get_total_lights_on());
        assert.strictEqual(lightGrid.get_total_lights_on(), 1);
      });

      test("applies instructions to grid with toggle", () => {
        let lightGrid = grid();
        let actionMap = { toggle: light => light.toggle() };
        let input     = ["toggle 0,0 through 0,0"];

        applyInstructions(input, lightGrid, actionMap, grid => grid.get_total_lights_on());
        assert.strictEqual(lightGrid.get_total_lights_on(), 1);
      });

      test("applies instructions to grid with turn off", () => {
        let lightGrid = grid();
        let actionMap = { "turn off": light => light.turn_off() };
        let input     = ["turn off 0,0 through 0,0"];

        applyInstructions(input, lightGrid, actionMap, grid => grid.get_total_lights_on());
        assert.strictEqual(lightGrid.get_total_lights_on(), 0);
      });
    });

    test.describe("when using .get_total_brightness", () => {
      test("applies instructions to grid", () => {
        let lightGrid = grid();
        let actionMap = { "turn on": light => light.increase_brightness() };
        let input     = ["turn on 0,0 through 0,0"];

        applyInstructions(input, lightGrid, actionMap, grid => grid.get_total_brightness());
        assert.strictEqual(lightGrid.get_total_brightness(), 1);
      });

      test("applies instructions to grid with toggle", () => {
        let lightGrid = grid();
        let actionMap = {
          toggle: light => {
            light.increase_brightness();
            light.increase_brightness();
          }
        };
        let input = ["toggle 0,0 through 0,0"];

        applyInstructions(input, lightGrid, actionMap, grid => grid.get_total_brightness());
        assert.strictEqual(lightGrid.get_total_brightness(), 2);
      });

      test("applies instructions to grid with turn off", () => {
        let lightGrid = grid();
        let actionMap = { "turn off": light => light.decrease_brightness() };
        let input     = ["turn off 0,0 through 0,0"];

        applyInstructions(input, lightGrid, actionMap, grid => grid.get_total_brightness());
        assert.strictEqual(lightGrid.get_total_brightness(), 0);
      });
    });
  });
});
