const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n").map(line => line.trim());

function solution_1(input) {
  let light_grid = grid();

  input.forEach(line => {
    let [, action, start, end] =
      line.match(/^(turn on|turn off|toggle) (\d+,\d+) through (\d+,\d+)$/);

    let [start_x, start_y] = start.split(",").map(Number);
    let [end_x, end_y]     = end.split(",").map(Number);

    let lights = light_grid.get_lights([start_x, start_y], [end_x, end_y]);

    switch (action) {
      case "turn on":
        lights.forEach(light => light.turn_on());
        break;
      case "turn off":
        lights.forEach(light => light.turn_off());
        break;
      case "toggle":
        lights.forEach(light => light.toggle());
        break;
    }
  });

  return light_grid.get_total_lights_on();
};

function solution_2(input) {
  let light_grid = grid();

  input.forEach(line => {
    let [, action, start, end] =
      line.match(/^(turn on|turn off|toggle) (\d+,\d+) through (\d+,\d+)$/);

    let [start_x, start_y] = start.split(",").map(Number);
    let [end_x, end_y]     = end.split(",").map(Number);

    let lights = light_grid.get_lights([start_x, start_y], [end_x, end_y]);

    switch (action) {
      case "turn on":
        lights.forEach(light => light.increase_brightness());
        break;
      case "turn off":
        lights.forEach(light => light.decrease_brightness());
        break;
      case "toggle":
        lights.forEach(light => light.increase_brightness());
        lights.forEach(light => light.increase_brightness());
        break;
    }
  });

  return light_grid.get_total_brightness();
};

function grid(size = 1000) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid.push(light(i, j));
    }
  }

  return {
    grid,
    get_light(x, y) { return grid[x * size + y]; },
    get_lights(start, end, lights = []) {
      let [start_x, start_y] = start;
      let [end_x, end_y]     = end;
      
      for (let x = start_x; x <= end_x; x++) {
        for (let y = start_y; y <= end_y; y++) {
          lights.push(this.get_light(x, y));
        }
      }
      return lights;
    },
    get_total_lights_on()  { return grid.filter(light => light.state).length; },
    get_total_brightness() { return grid.reduce((total, light) => total + light.brightness, 0); }
  };
}

function light (x, y, brightness = 0, state = false) {
  return {
    state,
    brightness,
    turn_on()     { this.state = true; },
    turn_off()    { this.state = false; },
    toggle()      { this.state = !this.state; },
    increase_brightness() { this.brightness++; },
    decrease_brightness() { if (this.brightness > 0) this.brightness--; },
    coordinates() { return { x, y }; },
  };
}

module.exports = {
  solution_1,
  solution_2,
  grid,
  light
};

console.log(`Day 6, Solution 1: ${solution_1(input)}`);
console.log(`Day 6, Solution 2: ${solution_2(input)}`);
