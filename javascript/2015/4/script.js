const fs   = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) { return findNumber(input, 5); };
function solution_2(input) { return findNumber(input, 6); };

function findNumber(input, zerosCount, count = 1) {
  let target = "0".repeat(zerosCount);
  while (true) {
    let hash = crypto.createHash("md5").update(input + count).digest("hex");
    if (hash.startsWith(target)) return count;
    count++;
  }
}

module.exports = {
  solution_1,
  solution_2
};

console.log(`Day 4, Solution 1: ${solution_1(input)}`);
console.log(`Day 4, Solution 2: ${solution_2(input)}`);