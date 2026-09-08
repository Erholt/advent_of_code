const fs   = require("node:fs");
const path = require("node:path");

let input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function solution_1(input) {
  }
function solution_2(input) {
  return "World Hello!";
}
module.exports = {
  solution_1,
  solution_2,
};