const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }
  }
  return floor;
}

function solution_2(input) {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }
    if (floor === -1) {
      return i + 1;
    }
  }
}


module.exports = {
  solution_1,
  solution_2
};