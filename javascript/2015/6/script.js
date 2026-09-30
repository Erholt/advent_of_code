const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n").map(line => line.trim());

const state_actions = {
  "turn on":  light => light.turn_on(),
  "turn off": light => light.turn_off(),
  toggle:     light => light.toggle()
};

const brightness_actions = {
  "turn on":  light => light.increase_brightness(),
  "turn off": light => light.decrease_brightness(),
  toggle:     light => {
    light.increase_brightness();
    light.increase_brightness();
  }
};

function solution_1(input, lightGrid = grid()) {
  return applyInstructions(input, lightGrid, state_actions, grid => grid.get_total_lights_on());
}

function solution_2(input, lightGrid = grid()) {
  return applyInstructions(input, lightGrid, brightness_actions, grid => grid.get_total_brightness());
}

function create_lights(size, lights) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      lights.push(light(i, j));
    }
  }

  return lights;
}

function get_lights(lights, size, start, end, selected) {
  let [start_x, start_y] = start;
  let [end_x, end_y]     = end;

  for (let x = start_x; x <= end_x; x++) {
    for (let y = start_y; y <= end_y; y++) {
      selected.push(lights[x * size + y]);
    }
  }

  return selected;
}

function grid(size = 1000, existing_lights = []) {
  let lights = create_lights(size, existing_lights);

  return {
    grid: lights,
    get_light: (x, y) => lights[x * size + y],
    get_lights: (start, end, selected = []) => get_lights(lights, size, start, end, selected),
    get_total_lights_on: () => lights.filter(light => light.state).length,
    get_total_brightness: () => lights.reduce((total, light) => total + light.brightness, 0)
  };
}

function light(x, y, brightness = 0, state = false) {
  let result = { state, brightness };

  result.turn_on             = () => { result.state = true; };
  result.turn_off            = () => { result.state = false; };
  result.toggle              = () => { result.state = !result.state; };
  result.increase_brightness = () => { result.brightness++; };
  result.decrease_brightness = () => { if (result.brightness > 0) result.brightness--; };
  result.coordinates = () => ({ x, y });

  return result;
}

function parseInstruction(line) {
  let [, action, start, end] =
    line.match(/^(turn on|turn off|toggle) (\d+,\d+) through (\d+,\d+)$/);
  let [startX, startY] = start.split(",").map(Number);
  let [endX, endY]     = end.split(",").map(Number);

  return { action, start: [startX, startY], end: [endX, endY] };
}

function applyInstructions(input, grid, actionMap, totalFn) {
  input.forEach(line => {
    let { action, start, end } = parseInstruction(line);
    let lights                 = grid.get_lights(start, end);

    lights.forEach(light => actionMap[action](light));
  });

  return totalFn(grid);
}

module.exports = {
  solution_1,
  solution_2,
  grid,
  light,
  parseInstruction,
  applyInstructions
};

console.log(`Day 6, Solution 1: ${solution_1(input)}`);
console.log(`Day 6, Solution 2: ${solution_2(input)}`);
