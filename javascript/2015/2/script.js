const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n");

function solution_1 (input) {
  return input.map(line => { return gift(line).wrapping_paper })
              .reduce((sum, value) => sum + value, 0);
}

function solution_2 (input) {
  return input.map(line => { return gift(line).combined_ribbon })
              .reduce((sum, value) => sum + value, 0);
}

function gift(dimensions) {
  let [l, w, h]          = dimensions.split("x").map(Number);
  let dimensions_numbers = [l, w, h];

  // Wrapping paper
  let surface_area   = (2 * l * w) + (2 * w * h) + (2 * h * l);
  let slack          = Math.min(l * w, w * h, h * l);
  let wrapping_paper = surface_area + slack;

  // Ribbon
  let sorted_dimensions = dimensions_numbers.slice().sort((a, b) => a - b);
  let ribbon            = 2 * (sorted_dimensions[0] + sorted_dimensions[1]);
  let bow_tie           = l * w * h;
  let combined_ribbon   = ribbon + bow_tie;

  return {
    wrapping_paper,
    combined_ribbon
  };
}

module.exports = {
  solution_1,
  solution_2,
  gift
};

console.log(`Day 2, Solution 1: ${solution_1(input)}`);
console.log(`Day 2, Solution 2: ${solution_2(input)}`);
