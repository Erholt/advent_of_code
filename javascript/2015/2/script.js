const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n");

function solution_1 (input) {
  return input.map(line => { return gift(line).wrapping_paper })
              .reduce((sum, value) => sum + value, 0);
}

function solution_2 (input) {
  return input.map(line => { return gift(line).ribbon })
              .reduce((sum, value) => sum + value, 0);
}

function gift(dimensions) {
  let sides = dimensions.split("x").map(Number);

  return {
    wrapping_paper: calculate_wrapping_paper(sides),
    ribbon:         calculate_ribbon(sides)
  };
}

function calculate_wrapping_paper([length, width, height]) {
  let surfaceArea = 2 * (length * width + width * height + height * length);
  let slack       = Math.min(length * width, width * height, height * length);

  return surfaceArea + slack;
}

function calculate_ribbon([length, width, height]) {
  let [shortest, nextShortest] = [length, width, height].sort((a, b) => a - b);

  return 2 * (shortest + nextShortest) + length * width * height;
}

module.exports = {
  solution_1,
  solution_2,
  gift
};

console.log(`Day 2, Solution 1: ${solution_1(input)}`);
console.log(`Day 2, Solution 2: ${solution_2(input)}`);
