const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) {
  if (input) {
    return "Hello World!";
  }
};

function solution_2(input) {
  if (input) {
    return "World Hello!";
  }
};

module.exports = {
  solution_1,
  solution_2
};

console.log(`Day 7, Solution 1: ${solution_1(input)}`);
console.log(`Day 7, Solution 2: ${solution_2(input)}`);
