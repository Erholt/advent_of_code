const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) {
  let array_of_houses_with_present = []

  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case "^":
        console.log("North")
        break;
      case "v":
        console.log("South")
        break;
      case ">":
        console.log("East")
        break;
      case "<":
        console.log("West")
        break;
    } 
  }

  return [...new Set(array_of_houses_with_present)].length
}

function solution_2(input) {
  return "World Hello!";
}

function coordinates() {
  let current_position = { x: 0, y: 0 }

  function go_north() { current_position.y += 1 }
  function go_south() { current_position.y -= 1 }
  function go_east()  { current_position.x += 1 }
  function go_west()  { current_position.x -= 1 }

  return {
    current_position,
    go_north,
    go_south,
    go_east,
    go_west
  }
}


module.exports = {
  solution_1,
  solution_2,
  coordinates
};