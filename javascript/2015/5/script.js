const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n").map(line => line.trim());

function solution_1(input) {
  console.log(input);
};

function solution_2(input) {
  return "Placeholder for Solution 2";
};

function apply_rules(string) {
  let twice_in_a_row        = false;
  let at_least_three_vowels = false;
  let no_bad_combinations   = false;

  if (string.match(/([a-z])\1/))                 { twice_in_a_row        = true; }
  if (string.match(/[aeiou].*[aeiou].*[aeiou]/)) { at_least_three_vowels = true; }
  if (string.match(/ab|cd|pq|xy/))               { no_bad_combinations   = false; } else { no_bad_combinations = true; }

  if (twice_in_a_row && at_least_three_vowels && no_bad_combinations) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  solution_1,
  solution_2,
  apply_rules
};

console.log(`Day 5, Solution 1: ${solution_1(input)}`);
console.log(`Day 5, Solution 2: ${solution_2(input)}`);
