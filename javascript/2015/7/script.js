const fs   = require("node:fs");
const path = require("node:path");

const input           = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();
const maximum_bit_num = 65535;

const operations = {
  AND:    (left, right) => left & right,
  OR:     (left, right) => left | right,
  LSHIFT: (left, right) => left << right,
  RSHIFT: (left, right) => left >>> right
};

function parse_instruction(line) {
  let [expression, wire] = line.split(" -> ");

  return [wire, expression];
}

function evaluate_instruction(parts, instructions, signals) {
  if (parts.length === 1) return get_wire(parts[0], instructions, signals);
  if (parts[0] === "NOT") return ~get_wire(parts[1], instructions, signals) & maximum_bit_num;
  let left  = get_wire(parts[0], instructions, signals);
  let right = get_wire(parts[2], instructions, signals);

  return operations[parts[1]](left, right) & maximum_bit_num;
}

function get_wire(wire, instructions, signals) {
  if (/^\d+$/.test(wire)) return Number(wire);
  if (Object.hasOwn(signals, wire)) return signals[wire];
  let expression = instructions[wire];

  if (!expression) throw new Error(`No instruction found for wire: ${wire}`);
  let parts  = expression.split(" ");
  let signal = evaluate_instruction(parts, instructions, signals);
  signals[wire] = signal;

  return signals[wire];
}

function evaluate_circuit(input, overrides = {}) {
  let lines        = input.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  let instructions = Object.fromEntries(lines.map(parse_instruction));
  let signals      = { ...overrides };

  for (let wire of Object.keys(instructions)) get_wire(wire, instructions, signals);

  return signals;
}

function solution_1(input) { return evaluate_circuit(input); }
function solution_2(input) {
  let part_one_signals = evaluate_circuit(input);
  let signals          = evaluate_circuit(input, { b: part_one_signals.a });

  return signals;
}

module.exports = {
  solution_1,
  solution_2
};

console.log(`Day 7, Solution 1: ${solution_1(input).a}`);
console.log(`Day 7, Solution 2: ${solution_2(input).a}`);
