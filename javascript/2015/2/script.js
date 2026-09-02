const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n");

function solution_1(input) {
  return input.map(line => {
    let [l, w, h]    = line.split("x").map(Number);
    let surface_area = (2 * l * w) + (2 * w * h) + (2 * h * l);
    let slack        = Math.min(l * w, w * h, h * l);
  
    return surface_area + slack;
  }).reduce((sum, value) => sum + value, 0);
}

function solution_2(input) {
  return "Hello World!";
}

console.log(`Day 2, Solution 1: ${solution_1(input)}`);
console.log(`Day 2, Solution 2: ${solution_2(input)}`);

module.exports = {
  solution_1,
  solution_2
};