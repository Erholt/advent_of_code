const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n").map(line => line.trim());

function solution_1(input) {
  return "Hello World!";
};

function solution_2(input) {
  return "World Hello!";
};

module.exports = {
  solution_1,
  solution_2
};

console.log(`Placeholder, Solution 1: ${solution_1(input)}`);
console.log(`Placeholder, Solution 2: ${solution_2(input)}`);
