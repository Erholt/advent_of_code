const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n").map(line => line.trim());

function solution_1(input, validated_strings = 0) {
  input.map(line => {
    if (apply_rules(line)) { validated_strings++; }
  });

  return validated_strings;
};

function solution_2(input, validated_strings = 0) {
  input.map(line => {
    let pair_of_letters_twice = line.match(/([a-z]{2}).*\1/);
    let letter_repeats        = line.match(/([a-z]).\1/);

    if (pair_of_letters_twice && letter_repeats) { validated_strings++; }
  });

  return validated_strings;
};

function apply_rules(string) {
  let twice_in_a_row        = string.match(/([a-z])\1/);
  let at_least_three_vowels = string.match(/[aeiou].*[aeiou].*[aeiou]/);
  let no_bad_combinations   = !string.match(/ab|cd|pq|xy/);

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
