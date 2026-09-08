const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) {
  let santa                     = coordinates();
  let array_of_houses_with_present = [santa.to_string()];

  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case "^": santa.go_north(); break;
      case "v": santa.go_south(); break;
      case ">": santa.go_east(); break;
      case "<": santa.go_west(); break;
    }
    array_of_houses_with_present.push(santa.to_string());
  }

  return [...new Set(array_of_houses_with_present)].length;
}

function solution_2(input) {
  let santa                        = coordinates();
  let robo_santa                   = coordinates();
  let array_of_houses_with_present = [santa.to_string()];

  for (let i = 0; i < input.length; i++) {
    let mover = i % 2 == 0 ? santa : robo_santa;
      
    switch (input[i]) {
      case "^": mover.go_north(); break;
      case "v": mover.go_south(); break;
      case ">": mover.go_east(); break;
      case "<": mover.go_west(); break;
    }
    
    array_of_houses_with_present.push(mover.to_string());
  }

  return [...new Set(array_of_houses_with_present)].length;
}

function coordinates() {
  let current_position = { x: 0, y: 0 }

  function to_string() { return `${current_position.x},${current_position.y}` }

  function go_north() { current_position.y += 1 }
  function go_south() { current_position.y -= 1 }
  function go_east()  { current_position.x += 1 }
  function go_west()  { current_position.x -= 1 }

  return {
    current_position,
    to_string,
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