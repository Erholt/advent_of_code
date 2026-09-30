const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) { return count_unique_houses(input, [coordinates()]); };
function solution_2(input) { return count_unique_houses(input, [coordinates(), coordinates()]); };

function move(mover, direction) {
  switch (direction) {
    case "^": mover.go_north(); break;
    case "v": mover.go_south(); break;
    case ">": mover.go_east(); break;
    case "<": mover.go_west(); break;
  }
}

function count_unique_houses(input, movers) {
  let visited = [movers[0].to_string()];

  for (let index = 0; index < input.length; index++) {
    let mover = movers[index % movers.length];
    move(mover, input[index]);
    visited.push(mover.to_string());
  }

  return new Set(visited).size;
}

function coordinates() {
  let current_position = { x: 0, y: 0 };

  return { current_position,
    to_string: () => `${current_position.x},${current_position.y}`,
    go_north:  () => { current_position.y += 1; },
    go_south:  () => { current_position.y -= 1; },
    go_east:   () => { current_position.x += 1; },
    go_west:   () => { current_position.x -= 1; }
  };
};

module.exports = {
  solution_1,
  solution_2,
  coordinates
};

console.log(`Day 3, Solution 1: ${solution_1(input)}`);
console.log(`Day 3, Solution 2: ${solution_2(input)}`);